/*******************************************************************************
 * Copyright (c) 2002, 2013 Innoopract Informationssysteme GmbH and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Innoopract Informationssysteme GmbH - initial API and implementation
 *    EclipseSource - ongoing development
 ******************************************************************************/
package org.eclipse.swt.internal.widgets.menuitemkit;

import static org.eclipse.rap.rwt.internal.protocol.ClientMessageConst.EVENT_SELECTION;
import static org.eclipse.rap.rwt.internal.protocol.RemoteObjectFactory.getRemoteObject;
import static org.eclipse.rap.rwt.lifecycle.WidgetUtil.getId;
import static org.eclipse.rap.rwt.lifecycle.WidgetUtil.registerDataKeys;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;

import java.io.IOException;
import java.util.Arrays;

import org.eclipse.rap.json.JsonArray;
import org.eclipse.rap.json.JsonObject;
import org.eclipse.rap.json.JsonValue;
import org.eclipse.rap.rwt.RWT;
import org.eclipse.rap.rwt.internal.remote.RemoteObjectRegistry;
import org.eclipse.rap.rwt.lifecycle.WidgetAdapter;
import org.eclipse.rap.rwt.lifecycle.WidgetUtil;
import org.eclipse.rap.rwt.remote.OperationHandler;
import org.eclipse.rap.rwt.testfixture.Fixture;
import org.eclipse.rap.rwt.testfixture.Message;
import org.eclipse.rap.rwt.testfixture.Message.CreateOperation;
import org.eclipse.rap.rwt.testfixture.Message.DestroyOperation;
import org.eclipse.rap.rwt.testfixture.Message.Operation;
import org.eclipse.rap.rwt.testfixture.internal.TestUtil;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.HelpEvent;
import org.eclipse.swt.events.HelpListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.internal.widgets.Props;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Menu;
import org.eclipse.swt.widgets.MenuItem;
import org.eclipse.swt.widgets.Shell;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InOrder;


public class MenuItemLCA_Test {

  private Display display;
  private Shell shell;
  private Menu menuBar;
  private Menu menu;
  private MenuItemLCA lca;

  @Before
  public void setUp() {
    Fixture.setUp();
    display = new Display();
    shell = new Shell( display );
    menuBar = new Menu( shell, SWT.BAR );
    menu = new Menu( shell, SWT.POP_UP );
    lca = new MenuItemLCA();
    Fixture.fakeNewRequest();
  }

  @After
  public void tearDown() {
    Fixture.tearDown();
  }

  @Test
  public void testBarPreserveValues() {
    shell.setMenuBar( menuBar );
    MenuItem menuItem = new MenuItem( menuBar, SWT.BAR );
    Fixture.markInitialized( display );
    testPreserveEnabled( menuItem );
    testPreserveText( menuItem );
  }

  @Test
  public void testPushPreserveValues() {
    MenuItem fileItem = new MenuItem( menuBar, SWT.CASCADE );
    Menu fileMenu = new Menu( shell, SWT.DROP_DOWN );
    fileItem.setMenu( fileMenu );
    shell.setMenuBar( menuBar );
    MenuItem menuItem = new MenuItem( fileMenu, SWT.PUSH );
    Fixture.markInitialized( display );
    testPreserveEnabled( menuItem );
    testPreserveText( menuItem );
  }

  @Test
  public void testRadioSelectionEventOrder() {
    MenuItem radioItem1 = new MenuItem( menu, SWT.RADIO );
    getRemoteObject( radioItem1 ).setHandler( new MenuItemOperationHandler( radioItem1 ) );
    MenuItem radioItem2 = new MenuItem( menu, SWT.RADIO );
    getRemoteObject( radioItem2 ).setHandler( new MenuItemOperationHandler( radioItem2 ) );
    radioItem2.setSelection( true );
    Listener radioItem1Listener = mock( Listener.class );
    radioItem1.addListener( SWT.Selection, radioItem1Listener );
    Listener radioItem2Listener = mock( Listener.class );
    radioItem2.addListener( SWT.Selection, radioItem2Listener );

    Fixture.fakeSetProperty( getId( radioItem1 ), "selection", true );
    Fixture.fakeSetProperty( getId( radioItem2 ), "selection", false );
    Fixture.fakeNotifyOperation( getId( radioItem1 ), EVENT_SELECTION, null );
    Fixture.fakeNotifyOperation( getId( radioItem2 ), EVENT_SELECTION, null );
    Fixture.readDataAndProcessAction( display );

    InOrder order = inOrder( radioItem1Listener, radioItem2Listener );
    order.verify( radioItem2Listener ).handleEvent( any( Event.class ) );
    order.verify( radioItem1Listener ).handleEvent( any( Event.class ) );
    order.verifyNoMoreInteractions();
  }

  private void testPreserveText( MenuItem menuItem ) {
    WidgetAdapter adapter;
    adapter = WidgetUtil.getAdapter( menuItem );
    Fixture.preserveWidgets();
    assertEquals( "", adapter.getPreserved( Props.TEXT ) );
    Fixture.clearPreserved();
    menuItem.setText( "some text" );
    Fixture.preserveWidgets();
    assertEquals( "some text", adapter.getPreserved( Props.TEXT ) );
    Fixture.clearPreserved();
  }

  private void testPreserveEnabled( MenuItem menuItem ) {
    WidgetAdapter adapter = WidgetUtil.getAdapter( menuItem );
    Fixture.preserveWidgets();
    assertEquals( Boolean.TRUE, adapter.getPreserved( Props.ENABLED ) );
    Fixture.clearPreserved();
    menuItem.setEnabled( false );
    Fixture.preserveWidgets();
    assertEquals( Boolean.FALSE, adapter.getPreserved( Props.ENABLED ) );
    Fixture.clearPreserved();
    menuItem.setEnabled( true );
    menuItem.getParent().setEnabled( false );
    Fixture.preserveWidgets();
    // even if parent is disabled
    assertEquals( Boolean.TRUE, adapter.getPreserved( Props.ENABLED ) );
    Fixture.clearPreserved();
  }

  @Test
  public void testRenderCreatePush() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );

    lca.renderInitialization( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertEquals( "rwt.widgets.MenuItem", operation.getType() );
    assertTrue( Arrays.asList( operation.getStyles() ).contains( "PUSH" ) );
  }

  @Test
  public void testRenderCreateCheck() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    lca.renderInitialization( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertEquals( "rwt.widgets.MenuItem", operation.getType() );
    assertTrue( Arrays.asList( operation.getStyles() ).contains( "CHECK" ) );
  }

  @Test
  public void testRenderCreateRadio() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.RADIO );

    lca.renderInitialization( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertEquals( "rwt.widgets.MenuItem", operation.getType() );
    assertTrue( Arrays.asList( operation.getStyles() ).contains( "RADIO" ) );
  }

  @Test
  public void testRenderCreateCascade() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CASCADE );

    lca.renderInitialization( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertEquals( "rwt.widgets.MenuItem", operation.getType() );
    assertTrue( Arrays.asList( operation.getStyles() ).contains( "CASCADE" ) );
  }

  @Test
  public void testRenderInitialization_setsOperationHandler() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );
    String id = getId( item );
    lca.renderInitialization( item );

    OperationHandler handler = RemoteObjectRegistry.getInstance().get( id ).getHandler();
    assertTrue( handler instanceof MenuItemOperationHandler );
  }

  @Test
  public void testReadData_usesOperationHandler() {
    MenuItem item = new MenuItem( menu, SWT.PUSH );
    MenuItemOperationHandler handler = spy( new MenuItemOperationHandler( item ) );
    getRemoteObject( getId( item ) ).setHandler( handler );

    Fixture.fakeNotifyOperation( getId( item ), "Help", new JsonObject() );
    lca.readData( item );

    verify( handler ).handleNotifyHelp( item, new JsonObject() );
  }

  @Test
  public void testRenderParent() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );

    lca.renderInitialization( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertEquals( WidgetUtil.getId( item.getParent() ), operation.getParent() );
  }

  @Test
  public void testRenderIndex() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );

    lca.renderInitialization( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( 0, message.findCreateProperty( item, "index" ).asInt() );
  }

  @Test
  public void testRenderDispose() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );

    lca.renderDispose( item );

    Message message = Fixture.getProtocolMessage();
    Operation operation = message.getOperation( 0 );
    assertTrue( operation instanceof DestroyOperation );
    assertEquals( WidgetUtil.getId( item ), operation.getTarget() );
  }

  @Test
  public void testRenderInitialMenu() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CASCADE );

    lca.render( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertTrue( operation.getPropertyNames().indexOf( "menu" ) == -1 );
  }

  @Test
  public void testRenderMenu() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CASCADE );
    Menu subMenu = new Menu( item );

    item.setMenu( subMenu );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( getId( subMenu ), message.findSetProperty( item, "menu" ).asString() );
  }

  @Test
  public void testRenderMenuUnchanged() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CASCADE );
    Menu subMenu = new Menu( item );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );

    item.setMenu( subMenu );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "menu" ) );
  }

  @Test
  public void testRenderInitialEnabled() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );

    lca.render( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertTrue( operation.getPropertyNames().indexOf( "enabled" ) == -1 );
  }

  @Test
  public void testRenderEnabled() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );

    item.setEnabled( false );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.FALSE, message.findSetProperty( item, "enabled" ) );
  }

  @Test
  public void testRenderEnabledUnchanged() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );

    item.setEnabled( false );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "enabled" ) );
  }

  @Test
  public void testRenderInitialSelection() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    lca.render( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertTrue( operation.getPropertyNames().indexOf( "selection" ) == -1 );
  }

  @Test
  public void testRenderSelection() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    item.setSelection( true );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.TRUE, message.findSetProperty( item, "selection" ) );
  }

  @Test
  public void testRenderSelectionUnchanged() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );

    item.setSelection( true );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "selection" ) );
  }

  @Test
  public void testRenderInitialCustomVariant() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    lca.render( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertTrue( operation.getPropertyNames().indexOf( "customVariant" ) == -1 );
  }

  @Test
  public void testRenderCustomVariant() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    item.setData( RWT.CUSTOM_VARIANT, "blue" );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( "variant_blue", message.findSetProperty( item, "customVariant" ).asString() );
  }

  @Test
  public void testRenderCustomVariantUnchanged() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );

    item.setData( RWT.CUSTOM_VARIANT, "blue" );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "customVariant" ) );
  }

  @Test
  public void testRenderInitialText() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    lca.render( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertTrue( operation.getPropertyNames().indexOf( "text" ) == -1 );
  }

  @Test
  public void testRenderText() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    item.setText( "foo" );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( "foo", message.findSetProperty( item, "text" ).asString() );
  }

  @Test
  public void testRenderText_WithMnemonic() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    item.setText( "f&oo" );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( "foo", message.findSetProperty( item, "text" ).asString() );
  }

  @Test
  public void testRenderTextUnchanged() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );

    item.setText( "foo" );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "text" ) );
  }

  @Test
  public void testRenderInitialMnemonicIndex() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "mnemonicIndex" ) );
  }

  @Test
  public void testRenderMnemonicIndex() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    item.setText( "te&st" );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( 2, message.findSetProperty( item, "mnemonicIndex" ).asInt() );
  }

  @Test
  public void testRenderMnemonicIndexOnSeparator() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.SEPARATOR );

    item.setText( "te&st" );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "mnemonicIndex" ) );
  }

  @Test
  public void testRenderMnemonicIndex_OnTextChange() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );

    item.setText( "te&st" );
    Fixture.preserveWidgets();
    item.setText( "aa&bb" );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( 2, message.findSetProperty( item, "mnemonicIndex" ).asInt() );
  }

  @Test
  public void testRenderMnemonicIndexUnchanged() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );

    item.setText( "te&st" );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "mnemonicIndex" ) );
  }

  @Test
  public void testRenderInitialImages() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );

    lca.render( item );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( item );
    assertTrue( operation.getPropertyNames().indexOf( "image" ) == -1 );
  }

  @Test
  public void testRenderImages() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Image image = TestUtil.createImage( display, Fixture.IMAGE1 );

    item.setImage( image );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    JsonArray expected
      = new JsonArray().add( "rwt-resources/generated/90fb0bfe.gif" ).add( 58 ).add( 12 );
    assertEquals( expected, message.findSetProperty( item, "image" ) );
  }

  @Test
  public void testRenderImagesUnchanged() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );
    Image image = TestUtil.createImage( display, Fixture.IMAGE1 );

    item.setImage( image );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( item, "image" ) );
  }

  @Test
  public void testRenderAddSelectionListener() throws Exception {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );
    Fixture.preserveWidgets();

    item.addListener( SWT.Selection, mock( Listener.class ) );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.TRUE, message.findListenProperty( item, "Selection" ) );
    assertNull( message.findListenOperation( item, "DefaultSelection" ) );
  }

  @Test
  public void testRenderRemoveSelectionListener() throws Exception {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Listener listener = mock( Listener.class );
    item.addListener( SWT.Selection, listener );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );
    Fixture.preserveWidgets();

    item.removeListener( SWT.Selection, listener );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.FALSE, message.findListenProperty( item, "Selection" ) );
    assertNull( message.findListenOperation( item, "DefaultSelection" ) );
  }

  @Test
  public void testRenderSelectionListenerUnchanged() throws Exception {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );
    Fixture.preserveWidgets();

    item.addSelectionListener( new SelectionAdapter() { } );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findListenOperation( item, "Selection" ) );
  }

  @Test
  public void testRenderAddHelpListener() throws Exception {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );
    Fixture.preserveWidgets();

    item.addHelpListener( new HelpListener() {
      public void helpRequested( HelpEvent e ) {
      }
    } );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.TRUE, message.findListenProperty( item, "Help" ) );
  }

  @Test
  public void testRenderRemoveHelpListener() throws Exception {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    HelpListener listener = new HelpListener() {
      public void helpRequested( HelpEvent e ) {
      }
    };
    item.addHelpListener( listener );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );
    Fixture.preserveWidgets();

    item.removeHelpListener( listener );
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.FALSE, message.findListenProperty( item, "Help" ) );
  }

  @Test
  public void testRenderHelpListenerUnchanged() throws Exception {
    MenuItem item = new MenuItem( menu, SWT.CHECK );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );
    Fixture.preserveWidgets();

    item.addHelpListener( new HelpListener() {
      public void helpRequested( HelpEvent e ) {
      }
    } );
    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findListenOperation( item, "help" ) );
  }

  @Test
  public void testRenderData() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );
    registerDataKeys( new String[]{ "foo", "bar" } );
    item.setData( "foo", "string" );
    item.setData( "bar", Integer.valueOf( 1 ) );

    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    JsonObject data = ( JsonObject )message.findSetProperty( item, "data" );
    assertEquals( "string", data.get( "foo" ).asString() );
    assertEquals( 1, data.get( "bar" ).asInt() );
  }

  @Test
  public void testRenderDataUnchanged() throws IOException {
    MenuItem item = new MenuItem( menu, SWT.PUSH );
    registerDataKeys( new String[]{ "foo" } );
    item.setData( "foo", "string" );
    Fixture.markInitialized( display );
    Fixture.markInitialized( item );

    Fixture.preserveWidgets();
    lca.renderChanges( item );

    Message message = Fixture.getProtocolMessage();
    assertEquals( 0, message.getOperationCount() );
  }

}
