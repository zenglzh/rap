/*******************************************************************************
 * Copyright (c) 2010, 2013 Innoopract Informationssysteme GmbH and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Innoopract Informationssysteme GmbH - initial API and implementation
 *    EclipseSource - ongoing development
 ******************************************************************************/

namespace( "rwt.widgets.util" );

(function(){

var Variant = rwt.util.Variant;

rwt.widgets.util.CellRendererRegistry = function() {

  var Wrapper = function() {};
  var rendererMap = {};

  this.add = function( renderer ) {
    checkRenderer( renderer );
    extendRenderer( renderer );
    rendererMap[ renderer.cellType ] = renderer;
  };

  this.getRendererFor = function( type ) {
    return rendererMap[ type ] || null;
  };

  this.removeRendererFor = function( type ) {
    delete rendererMap[ type ];
  };

  this.getAll = function( type ) {
    Wrapper.prototype = rendererMap;
    return new Wrapper();
  };

  var checkRenderer = function( renderer ) {
    if(    renderer == null
        || typeof renderer.contentType !== "string"
        || typeof renderer.cellType !== "string" )
    {
      throw new Error( "Can not register invalid renderer" );
    }
    if( rendererMap[ renderer.cellType ] != null ) {
      throw new Error( "Renderer for cellType " + renderer.cellType + " already registered" );
    }
  };

  var extendRenderer = function( renderer ) {
    var innerCreateElement = renderer.createElement || defaultCreateElement;
    renderer.createElement = function( cellData ) {
      var result = innerCreateElement( cellData );
      result.style.position = "absolute";
      result.style.overflow = "hidden";
      // NOTE : older IE can (in quirksmode) not deal with multiple css classes!
      var cssClass = cellData.selectable ? "rwt-cell-selectable" : "rwt-cell";
      if( rwt.client.Client.isMshtml() ) {
        result.className = cssClass;
      } else {
        result.setAttribute( "class", cssClass );
      }
      return result;
    };
  };

  var defaultCreateElement = function() {
    return document.createElement( "div" );
  };

};


rwt.widgets.util.CellRendererRegistry.getInstance = function() {
  if( !rwt.widgets.util.CellRendererRegistry._instance ) {
    rwt.widgets.util.CellRendererRegistry._instance
      = new rwt.widgets.util.CellRendererRegistry();
  }
  return rwt.widgets.util.CellRendererRegistry._instance;
};

///////////////////
// default renderer

var Encoding = rwt.util.Encoding;

var escapeText = function( text, removeNewLines ) {
  var result = Encoding.escapeText( text, false );
  result = Encoding.replaceNewLines( result, removeNewLines ? "" : "<br/>" );
  result = Encoding.replaceWhiteSpaces( result );
  return result;
};

var alignmentStyleToCss = {
  "LEFT" : "left",
  "CENTER" : "center",
  "RIGHT" : "right",
  "TOP" : "top",
  "BOTTOM" : "bottom"
};

rwt.widgets.util.CellRendererRegistry.getInstance().add( {
  "cellType" : "text",
  "contentType" : "text",
  "createElement" : function( cellData ) {
    var result = document.createElement( "div" );
    result.style.textAlign = alignmentStyleToCss[ cellData.horizontalAlignment ] || "left";
    result.style.whiteSpace = cellData.wrap ? "" : "nowrap";
    result.style.textOverflow = "ellipsis";
    return result;
  },
  "renderContent" : Variant.select( "qx.client", {
    "mshtml|newmshtml" : function( element, content, cellData, options ) {
      var text = content || "";
      if( options.markupEnabled ) {
        if( element.rap_Markup !== text ) {
          element.innerHTML = text;
          element.rap_Markup = text;
        }
      } else if( options.seeable ) {
        if( options.removeNewLines ) {
          text = Encoding.replaceNewLines( text, "" );
        }
        element.innerText = text; // considerably faster than innerHTML
      } else {
        element.innerHTML = escapeText( text, options.removeNewLines );
      }
    },
    "default" : function( element, content, cellData, options ) {
      var text = content || "";
      if( options.markupEnabled ) {
        if( text !== element.rap_Markup ) {
          element.innerHTML = text;
          element.rap_Markup = text;
        }
      } else {
        element.innerHTML = escapeText( text, options.removeNewLines );
      }
    }
  } )
} );

var setImage = function( element, content, cellData, options ) {
  var opacity = options.enabled ? 1 : 0.3;
  var src = content ? content[ 0 ] : null;
  rwt.html.Style.setBackgroundImage( element, src, opacity );
};

var imgHtml = function( path, left, top, width, height ) {
  return   "<img style=\"position:absolute;width:"
         + width
         + "px;height:"
         + height
         + "px;left:"
         + left
         + "px;top:"
         + top
         + "px;\" src=\""
         + path
         + "\">";
};

rwt.widgets.util.CellRendererRegistry.getInstance().add( {
  "cellType" : "image",
  "contentType" : "image",
  "renderContent" : rwt.util.Variant.select( "qx.client", {
    "default" : setImage,
    "mshtml" : function( element, content, cellData, options ) {
      if( !cellData.scaleMode || cellData.scaleMode === "NONE" ) {
        setImage( element, content, cellData, options );
      } else {
        if( content ) {
          var fit = cellData.scaleMode === "FIT";
          var fill = cellData.scaleMode === "FILL";
          var path = rwt.html.Style._resolveResource( content[ 0 ] );
          var width = options.width;
          var height = options.height;
          var left = 0;
          var top = 0;
          if( fit || fill ) {
            var imageWiderThanCell = options.width / options.height > content[ 1 ] / content[ 2 ];
            if( ( fit && imageWiderThanCell ) || ( fill && !imageWiderThanCell ) ) {
              width = Math.round( content[ 1 ] * height / content[ 2 ] );
              left = Math.round( ( options.width - width ) / 2 );
            } else  {
              height = Math.round( content[ 2 ] * width / content[ 1 ] );
              top = Math.round( ( options.height - height ) / 2 );
            }
          }
          element.innerHTML = imgHtml( path, left, top, width, height );
        } else {
          element.innerHTML = "";
        }
      }
    }
  } ),
  "createElement" : function( cellData ) {
    var result = document.createElement( "div" );
    result.style.backgroundRepeat = "no-repeat";
    var position = [ "center", "center" ];
    if( cellData.scaleMode === "FIT" ) {
      result.style.backgroundSize = "contain";
    } else if( cellData.scaleMode === "FILL" ) {
      result.style.backgroundSize = "cover";
    } else if( cellData.scaleMode === "STRETCH" ) {
      result.style.backgroundSize = "100% 100%";
    } else {
      position[ 0 ] = alignmentStyleToCss[ cellData.horizontalAlignment ] || "center";
      position[ 1 ] = alignmentStyleToCss[ cellData.verticalAlignment ] || "center";
    }
    result.style.backgroundPosition = position.join( " " );
    return result;
  }
} );

}());
