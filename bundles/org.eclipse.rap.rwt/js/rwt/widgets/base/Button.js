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
 * A button.
 *
 * @appearance button
 * @state abandoned
 * @state over
 * @state pressed
 */
rwt.qx.Class.define("rwt.widgets.base.Button",
{
  extend : rwt.widgets.base.Atom,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vText, vIcon, vIconWidth, vIconHeight, vFlash)
  {
    this.base(arguments, vText, vIcon, vIconWidth, vIconHeight, vFlash);

    this.initTabIndex();

    this.addEventListener("mouseover", this._onmouseover);
    this.addEventListener("mouseout", this._onmouseout);
    this.addEventListener("mousedown", this._onmousedown);
    this.addEventListener("mouseup", this._onmouseup);

    this.addEventListener("keydown", this._onkeydown);
    this.addEventListener("keyup", this._onkeyup);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    appearance :
    {
      refine : true,
      init : "button"
    },

    tabIndex :
    {
      refine : true,
      init : 1
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Listener method for "mouseover" event
     * <ul>
     * <li>Adds state "over"</li>
     * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
     * </ul>
     *
     * @type member
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onmouseover : function(e)
    {
      if (e.getTarget() != this) {
        return;
      }

      if (this.hasState("abandoned"))
      {
        this.removeState("abandoned");
        this.addState("pressed");
      }

      this.addState("over");
    },


    /**
     * Listener method for "mouseout" event
     * <ul>
     * <li>Removes "over" state</li>
     * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
     * </ul>
     *
     * @type member
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onmouseout : function(e)
    {
      if (e.getTarget() != this) {
        return;
      }

      this.removeState("over");

      if (this.hasState("pressed"))
      {
        // Activate capturing if the button get a mouseout while
        // the button is pressed.
        this.setCapture(true);

        this.removeState("pressed");
        this.addState("abandoned");
      }
    },


    /**
     * Listener method for "mousedown" event
     * <ul>
     * <li>Removes "abandoned" state</li>
     * <li>Adds "pressed" state</li>
     * </ul>
     *
     * @type member
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onmousedown : function(e)
    {
      if (e.getTarget() != this || !e.isLeftButtonPressed()) {
        return;
      }

      this.removeState("abandoned");
      this.addState("pressed");
    },


    /**
     * Listener method for "mouseup" event
     * <ul>
     * <li>Removes "pressed" state (if set)</li>
     * <li>Removes "abandoned" state (if set)</li>
     * <li>Adds "over" state (if "abandoned" state is not set)</li>
     *
     * @type member
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onmouseup : function(e)
    {
      this.setCapture(false);

      // We must remove the states before executing the command
      // because in cases were the window lost the focus while
      // executing we get the capture phase back (mouseout).
      var hasPressed = this.hasState("pressed");
      var hasAbandoned = this.hasState("abandoned");

      if (hasPressed) {
        this.removeState("pressed");
      }

      if (hasAbandoned) {
        this.removeState("abandoned");
      }

      if (!hasAbandoned)
      {
        this.addState("over");

        if (hasPressed) {
          this.execute();
        }
      }
    },


    /**
     * Listener method for "keydown" event.<br/>
     * Removes "abandoned" and adds "pressed" state
     * for the keys "Enter" or "Space"
     *
     * @type member
     * @param e {Event} Key event
     * @return {void}
     */
    _onkeydown : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          this.removeState("abandoned");
          this.addState("pressed");
          e.stopPropagation();
      }
    },


    /**
     * Listener method for "keyup" event.<br/>
     * Removes "abandoned" and "pressed" state (if "pressed" state is set)
     * for the keys "Enter" or "Space"
     *
     * @type member
     * @param e {Event} Key event
     * @return {void}
     */
    _onkeyup : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          if (this.hasState("pressed"))
          {
            this.removeState("abandoned");
            this.removeState("pressed");
            this.execute();
            e.stopPropagation();
          }
      }
    }
  }
});
