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

/** Event object for data transfers. */
rwt.qx.Class.define("rwt.event.DataEvent",
{
  extend : rwt.event.Event,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

 /**
  * @param vType {String} the type name of the event
  * @param vData {var} additional data which should be passed to the event listener
  */
  construct : function(vType, vData)
  {
    this.base(arguments, vType);

    this.setData(vData);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    propagationStopped :
    {
      _fast        : true,
      defaultValue : false
    },

    data : { _fast : true }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("_valueData");
  }
});
