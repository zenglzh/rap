/*******************************************************************************
 * Copyright (c) 2007, 2011 Innoopract Informationssysteme GmbH.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Innoopract Informationssysteme GmbH - initial API and implementation
 *    EclipseSource - ongoing development
 ******************************************************************************/
package org.eclipse.rwt.internal.uicallback;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.eclipse.rwt.internal.lifecycle.JavaScriptResponseWriter;
import org.eclipse.rwt.internal.service.ContextProvider;
import org.eclipse.rwt.service.IServiceHandler;
import org.eclipse.rwt.service.ISessionStore;


public class UICallBackServiceHandler implements IServiceHandler {

  // keep in sync with function enableUICallBack() in Request.js
  public final static String HANDLER_ID = UICallBackServiceHandler.class.getName();

  private static final String JS_SEND_UI_REQUEST
    = "org.eclipse.swt.Request.getInstance().send();";

  public void service() throws IOException {
    HttpServletResponse response = ContextProvider.getResponse();
    ISessionStore sessionStore = ContextProvider.getSession();
    boolean needsUiRequest = UICallBackManager.getInstance().processCallBackRequest( response );
    if( sessionStore.isBound() && needsUiRequest ) {
      writeResponse( response );
    }
  }

  //////////////////////////
  // Service helping methods
  
  static void writeResponse( HttpServletResponse response ) throws IOException {
    JavaScriptResponseWriter writer = new JavaScriptResponseWriter( response );
    writer.write( JS_SEND_UI_REQUEST );
  }
}