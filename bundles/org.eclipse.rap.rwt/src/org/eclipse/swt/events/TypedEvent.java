/*******************************************************************************
 * Copyright (c) 2002-2006 Innoopract Informationssysteme GmbH.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     Innoopract Informationssysteme GmbH - initial API and implementation
 ******************************************************************************/

package org.eclipse.swt.events;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.rwt.internal.events.Event;
import org.eclipse.rwt.internal.lifecycle.CurrentPhase;
import org.eclipse.rwt.internal.service.ContextProvider;
import org.eclipse.rwt.internal.service.IServiceStateInfo;
import org.eclipse.rwt.lifecycle.PhaseId;
import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.LocationEvent;
import org.eclipse.swt.custom.CTabFolderEvent;
import org.eclipse.swt.internal.events.ActivateEvent;
import org.eclipse.swt.internal.widgets.IDisplayAdapter;
import org.eclipse.swt.internal.widgets.SetDataEvent;
import org.eclipse.swt.internal.widgets.IDisplayAdapter.IFilterEntry;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Widget;



/**
 * This is the super class for all typed event classes provided
 * by RWT. Typed events contain particular information which is
 * applicable to the event occurrence.
 *
 * @see org.eclipse.swt.widgets.Event
 */
public class TypedEvent extends Event {

  private static final String ATTR_SCHEDULED_EVENT_LIST 
    = TypedEvent.class.getName() + "_scheduledEventList";

  // TODO [rh] event order is preliminary
  private static final Class[] EVENT_ORDER = {
    ControlEvent.class,
    ActivateEvent.class,
    DisposeEvent.class,
    SetDataEvent.class,
    VerifyEvent.class,
    ModifyEvent.class,
    TreeEvent.class,
    CTabFolderEvent.class,
    FocusEvent.class,
    SelectionEvent.class,
    LocationEvent.class,
    ShellEvent.class,
    MenuEvent.class
  };
  
  /**
   * the widget that issued the event
   */
  public Widget widget;
  
  /**
   * a field for application use
   */
  public Object data;
  
  /**
   * Constructs a new instance of this class.
   * 
   * <p><strong>IMPORTANT:</strong> This method is <em>not</em> part of the RWT
   * public API. It is marked public only so that it can be shared
   * within the packages provided by RWT. It should never be accessed 
   * from application code.
   * </p>
   */
  public TypedEvent( final Object source, final int id ) {
    super( source, id );
    this.widget = (Widget) source;
  }
  
  public Object getSource() {
    // TODO [rh] introduced to get rid of discouraged access warning when 
    //      application code accesses getSource() which is defined in 
    //      org.eclipse.rwt.internal.events.Event
    return super.getSource();
  }

  /**
   * <p><strong>IMPORTANT:</strong> This method is <em>not</em> part of the RWT
   * public API. It is marked public only so that it can be shared
   * within the packages provided by RWT. It should never be accessed 
   * from application code.
   * </p>
   */
  public final void processEvent() {
    // TODO: [fappel] In case of session invalidation there's no phase.
    //                So no event processing should take place, this situation
    //                may improve with the new readAndDispatch mechanism in
    //                place.
    if( CurrentPhase.get() != null ) {
      if(    PhaseId.PREPARE_UI_ROOT.equals( CurrentPhase.get() ) 
          || PhaseId.PROCESS_ACTION.equals( CurrentPhase.get() ) ) 
      {
        // TODO [fappel]: changes of the event fields in the filter handler
        //                methods should be forwarded to this event...
        if( !isFiltered( processFilters() ) ) {
          super.processEvent();
        }
      } else {
        addToScheduledEvents( this );
      }
    }
  }

  /**
   * <p><strong>IMPORTANT:</strong> This method is <em>not</em> part of the RWT
   * public API. It is marked public only so that it can be shared
   * within the packages provided by RWT. It should never be accessed 
   * from application code.
   * </p>
   */
  public static void processScheduledEvents() {
    for( int i = 0; i < EVENT_ORDER.length; i++ ) {
      processEventClass( EVENT_ORDER[ i ] );
    }
    clearScheduledEventList();
  }
  
  ////////////////////////////////////
  // methods for filter implementation 
  
  private org.eclipse.swt.widgets.Event processFilters() {
    IFilterEntry[] filters = getFilterEntries();
    org.eclipse.swt.widgets.Event result
      = new org.eclipse.swt.widgets.Event();
    result.widget = widget;
    result.type = getID();
    for( int i = 0; !isFiltered( result ) && i < filters.length; i++ ) {
      if( filters[ i ].getType() == result.type ) {
        filters[ i ].getListener().handleEvent( result );
      }
    }
    return result;
  }

  private boolean isFiltered( final org.eclipse.swt.widgets.Event event ) {
    return event.type == SWT.None;
  }

  private IFilterEntry[] getFilterEntries() {
    Display display = Display.getCurrent();
    IDisplayAdapter adapter 
      = ( IDisplayAdapter )display.getAdapter( IDisplayAdapter.class );
    return adapter.getFilters();
  }

  ///////////////////////////////////////////////
  // Methods to maintain list of scheduled events
  
  private static void addToScheduledEvents( final TypedEvent event ) {
    getScheduledEventList().add( event );
  }
  
  private static TypedEvent[] getScheduledEvents() {
    List list = getScheduledEventList();
    TypedEvent[] result = new TypedEvent[ list.size() ];
    list.toArray( result );
    return result;
  }
  
  private static List getScheduledEventList() {
    List result;
    IServiceStateInfo stateInfo = ContextProvider.getStateInfo();
    result = ( List )stateInfo.getAttribute( ATTR_SCHEDULED_EVENT_LIST );
    if( result == null ) {
      result = new ArrayList();
      stateInfo.setAttribute( ATTR_SCHEDULED_EVENT_LIST, result );
    }
    return result;
  }
  
  private static void clearScheduledEventList() {
    getScheduledEventList().clear();
  }

  private static void processEventClass( final Class eventClass ) {
    TypedEvent[] scheduledEvents = getScheduledEvents();
    for( int i = 0; i < scheduledEvents.length; i++ ) {
      if(    eventClass.equals( scheduledEvents[ i ].getClass() ) 
          && scheduledEvents[ i ].allowProcessing() ) 
      {
        scheduledEvents[ i ].processEvent();
      }
    }
  }

  ///////////////////////
  // Stub implementations
  
  protected boolean allowProcessing() {
  	String msg = "Derived classes must override allowProcessing.";
  	throw new UnsupportedOperationException( msg );
  }
  
  // Exception to get rid of abstract TypedEvent
  protected void dispatchToObserver( final Object listener ) {
  	String msg = "Derived classes must override dispatchToObserver.";
  	throw new UnsupportedOperationException( msg );
  }

  // Exception to get rid of abstract TypedEvent
  protected Class getListenerType() {
  	String msg = "Derived classes must override getListenerType.";
  	throw new UnsupportedOperationException( msg );
  }
  
  ///////////////////////////////
  // toString & getName from SWT 

  // this implementation is extended by subclasses
  public String toString() {
    return getName()
        + "{"
        + widget 
//        TODO [rst] uncomment when these public fields are implemented
//        + " time=" + time + 
        + " data=" 
        + data
        + "}";
  }
  
  private String getName() {
    String result = getClass().getName();
    int index = result.lastIndexOf( '.' );
    if( index != -1 ) {
      result = result.substring( index + 1, result.length() );
    }
    return result;
  }
}
