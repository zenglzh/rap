/*******************************************************************************
 * Copyright (c) 2004, 2013 1&1 Internet AG, Germany, http://www.1und1.de,
 *                          EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    1&1 Internet AG and others - original API and implementation
 *    EclipseSource - adaptation for the Eclipse Remote Application Platform
 ******************************************************************************/

/**
 * A multi-purpose widget used by many more complex widgets.
 *
 * The intended purpose of rwt.widgets.base.Atom is to easily align the common icon-text
 * combination in different ways.
 *
 * This is useful for all types of buttons, menuentries, tooltips, ...
 *
 * @appearance atom
 */
rwt.qx.Class.define("rwt.widgets.base.Atom",
{
  extend : rwt.widgets.base.BoxLayout,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param vLabel {String} label of the atom
   * @param vIcon {String?null} Icon URL of the atom
   * @param vIconWidth {Integer?null} desired width of the icon (the icon will be scaled to this size)
   * @param vIconHeight {Integer?null} desired height of the icon (the icon will be scaled to this size)
   * @param vFlash {qx.ui.embed.Flash?null} optional flash animation for the Atom. Needs valid width and height values.
   */
  construct : function(vLabel, vIcon, vIconWidth, vIconHeight, vFlash)
  {
    this.base(arguments);

    // Disable flex support
    this.getLayoutImpl().setEnableFlexSupport(false);

    // Apply constructor arguments
    if (vLabel !== undefined) {
      this.setLabel(vLabel);
    }

    // Simple flash wrapper
    if (rwt.qx.Class.isDefined("qx.ui.embed.Flash") && vFlash != null && vIconWidth != null && vIconHeight != null && qx.ui.embed.Flash.getPlayerVersion().getMajor() > 0)
    {
      this._flashMode = true;

      this.setIcon(vFlash);
    }
    else if (vIcon != null)
    {
      this.setIcon(vIcon);
    }

    if (vIcon || vFlash)
    {
      if (vIconWidth != null) {
        this.setIconWidth(vIconWidth);
      }

      if (vIconHeight != null) {
        this.setIconHeight(vIconHeight);
      }
    }

    // Property init
    this.initWidth();
    this.initHeight();
  },





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      REFINED PROPERTIES
    ---------------------------------------------------------------------------
    */

    orientation :
    {
      refine : true,
      init : "horizontal"
    },

    allowStretchX :
    {
      refine : true,
      init : false
    },

    allowStretchY :
    {
      refine : true,
      init : false
    },

    appearance :
    {
      refine : true,
      init : "atom"
    },

    stretchChildrenOrthogonalAxis :
    {
      refine : true,
      init : false
    },

    width :
    {
      refine : true,
      init : "auto"
    },

    height :
    {
      refine : true,
      init : "auto"
    },

    horizontalChildrenAlign :
    {
      refine : true,
      init : "center"
    },

    verticalChildrenAlign :
    {
      refine : true,
      init : "middle"
    },

    spacing :
    {
      refine : true,
      init : 4
    },






    /*
    ---------------------------------------------------------------------------
      OWN PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** The label/caption/text of the rwt.widgets.base.Atom instance */
    label :
    {
      apply : "_applyLabel",
      nullable : true,
      dispose : true,
      check : "Label"
    },


    /** Any URI String supported by rwt.widgets.base.Image to display a icon */
    icon :
    {
      check : "String",
      apply : "_applyIcon",
      nullable : true,
      themeable : true
    },


    /**
     * Any URI String supported by rwt.widgets.base.Image to display a disabled icon.
     * <p>
     * If not set the normal icon is shown transparently.
     */
    disabledIcon :
    {
      check : "String",
      apply : "_applyDisabledIcon",
      nullable : true,
      themeable : true
    },


    /**
     * Configure the visibility of the sub elements/widgets.
     *  Possible values: both, text, icon, none
     */
    show :
    {
      init : "both",
      check : [ "both", "label", "icon", "none"],
      themeable : true,
      nullable : true,
      inheritable : true,
      apply : "_applyShow",
      event : "changeShow"
    },


    /**
     * The position of the icon in relation to the text.
     *  Only useful/needed if text and icon is configured and 'show' is configured as 'both' (default)
     */
    iconPosition :
    {
      init   : "left",
      check : [ "top", "right", "bottom", "left" ],
      themeable : true,
      apply : "_applyIconPosition"
    },


    /**
     * The width of the icon.
     *  If configured, this makes rwt.widgets.base.Atom a little bit faster as it does not need to wait until the image loading is finished.
     */
    iconWidth :
    {
      check : "Integer",
      themeable : true,
      apply : "_applyIconWidth",
      nullable : true
    },


    /**
     * The height of the icon
     *  If configured, this makes rwt.widgets.base.Atom a little bit faster as it does not need to wait until the image loading is finished.
     */
    iconHeight :
    {
      check : "Integer",
      themeable : true,
      apply : "_applyIconHeight",
      nullable : true
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      SUB WIDGETS
    ---------------------------------------------------------------------------
    */

    _flashMode : false,

    _labelObject : null,
    _iconObject : null,


    /**
     * Creates the label object
     *
     * @type member
     */
    _createLabel : function()
    {
      var l = this._labelObject = new rwt.widgets.base.Label(this.getLabel());

      l.setAnonymous(true);
// RAP [rst] qx bug 455 http://bugzilla.qooxdoo.org/show_bug.cgi?id=455
//      l.setCursor("default");

      this.addAt(l, this._iconObject ? 1 : 0);
    },


    /**
     * Creates the icon object
     *
     * @type member
     */
    _createIcon : function()
    {
      if (this._flashMode && rwt.qx.Class.isDefined("qx.ui.embed.Flash")) {
        var i = this._iconObject = new qx.ui.embed.Flash(this.getIcon());
      } else {
        var i = this._iconObject = new rwt.widgets.base.Image();
      }

      i.setAnonymous(true);

      var width = this.getIconWidth();
      if (width !== null) {
        this._iconObject.setWidth(width);
      }

      var height = this.getIconWidth();
      if (height !== null) {
        this._iconObject.setHeight(height);
      }

      this._updateIcon();
      this.addAt(i, 0);
    },


    /**
     * updates the icon
     *
     * @type member
     */
    _updateIcon : function() {
      var icon = this.getIcon();
      // NOTE: We have to check whether the properties "icon" and "disabledIcon"
      //       exist, because some child classes remove them.
      if( this._iconObject && this.getIcon && this.getDisabledIcon ) {
        var disabledIcon = this.getDisabledIcon();
        if( disabledIcon ) {
          if( this.getEnabled() ) {
            if( icon ) {
              this._iconObject.setSource( icon );
            } else {
              this._iconObject.resetSource();
            }
          } else {
            if( disabledIcon ) {
              this._iconObject.setSource( disabledIcon );
            } else {
              this._iconObject.resetSource();
            }
          }
          this._iconObject.setEnabled( true );
        } else {
          if( icon ) {
            this._iconObject.setSource( icon );
          } else {
            this._iconObject.resetSource();
          }
          this._iconObject.resetEnabled();
        }
      }
    },


    /**
     * Get the label widget of the atom.
     *
     * @type member
     * @return {rwt.widgets.base.Label} The label widget of the atom.
     */
    getLabelObject : function() {
      return this._labelObject;
    },


    /**
     * Get the icon widget of the atom.
     *
     * @type member
     * @return {rwt.widgets.base.Image|qx.ui.embed.Flash} The icon widget of the atom.
     */
    getIconObject : function() {
      return this._iconObject;
    },




    /*
    ---------------------------------------------------------------------------
      MODIFIERS
    ---------------------------------------------------------------------------
    */

    /**
     * Applies the icon position
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyIconPosition : function(value, old)
    {
      switch(value)
      {
        case "top":
        case "bottom":
          this.setOrientation("vertical");
          this.setReverseChildrenOrder(value == "bottom");
          break;

        default:
          this.setOrientation("horizontal");
          this.setReverseChildrenOrder(value == "right");
          break;
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyShow : function(value, old)
    {
      this._handleIcon();
      this._handleLabel();
    },


    /**
     * TODOC
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyLabel : function( value, old ) {
      if( this._labelObject ) {
        if( value ) {
          this._labelObject.setText( value );
        } else {
          this._labelObject.resetText();
        }
      }
      this._handleLabel();
    },


    /**
     * TODOC
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyIcon : function(value, old)
    {
      this._updateIcon();
      this._handleIcon();
    },


    /**
     * TODOC
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyDisabledIcon : function(value, old)
    {
      this._updateIcon();
      this._handleIcon();
    },


    /**
     * TODOC
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyIconWidth : function(value, old) {
      if (this._iconObject) {
        this._iconObject.setWidth(value);
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyIconHeight : function(value, old) {
      if (this._iconObject) {
        this._iconObject.setHeight(value);
      }
    },




    /*
    ---------------------------------------------------------------------------
      HANDLER
    ---------------------------------------------------------------------------
    */

    _iconIsVisible : false,
    _labelIsVisible : false,


    /**
     * Handle label
     *
     * @type member
     * @return {void}
     */
    _handleLabel : function() {
      switch( this.getShow() ) {
        case "label":
        case "both":
        case "inherit":
          this._labelIsVisible = !!this.getLabel();
          break;
        default:
          this._labelIsVisible = false;
      }
      if( this._labelIsVisible ) {
        if( this._labelObject ) {
          this._labelObject.setDisplay( true );
        } else {
          this._createLabel();
        }
      } else if( this._labelObject ) {
        this._labelObject.setDisplay( false );
      }
    },


    /**
     * handle icon
     *
     * @type member
     * @return {void}
     */
    _handleIcon : function() {
      switch( this.getShow() ) {
        case "icon":
        case "both":
        case "inherit":
          this._iconIsVisible = !!this.getIcon();
          break;
        default:
          this._iconIsVisible = false;
      }
      if( this._iconIsVisible ) {
        if( this._iconObject ) {
          this._iconObject.setDisplay( true );
        } else {
          this._createIcon();
        }
      } else if( this._iconObject ) {
        this._iconObject.setDisplay( false );
      }
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeObjects("_iconObject", "_labelObject");
  }
});
