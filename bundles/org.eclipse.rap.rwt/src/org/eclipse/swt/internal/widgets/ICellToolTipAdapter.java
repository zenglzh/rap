/*******************************************************************************
 * Copyright (c) 2011 EclipseSource and others. All rights reserved.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   EclipseSource - initial API and implementation
 ******************************************************************************/
package org.eclipse.swt.internal.widgets;

public interface ICellToolTipAdapter {

  ICellToolTipProvider getCellToolTipProvider();
  void setCellToolTipProvider( ICellToolTipProvider provider );

  String getCellToolTipText();
  void setCellToolTipText( String toolTipText );
}
