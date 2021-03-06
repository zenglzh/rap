/*******************************************************************************
 * Copyright (c) 2011, 2012 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/
package org.eclipse.swt.accessibility;

import java.io.NotSerializableException;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import org.eclipse.rap.rwt.testfixture.Fixture;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;


public class Accessible_Test {

  @Before
  public void setUp() {
    Fixture.setUp();
  }

  @After
  public void tearDown() {
    Fixture.tearDown();
  }

  @Test
  public void testIsNotSerializable() throws Exception {
    Display display = new Display();
    Control control = new Shell( display );
    Accessible accessible = new Accessible( control );

    try {
      Fixture.serializeAndDeserialize( accessible );
    } catch( NotSerializableException expected ) {
    }
  }

  @Test
  public void testAccessibleAfterDeserialization() throws Exception {
    Display display = new Display();
    Control control = new Shell( display );

    Control deserializedControl = Fixture.serializeAndDeserialize( control );

    assertNotNull( deserializedControl.getAccessible() );
  }

}
