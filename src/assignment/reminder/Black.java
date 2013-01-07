package assignment.reminder;

import org.apache.cordova.DroidGap;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;

public class Black extends DroidGap {

	/** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
     super.loadUrl("file:///android_asset/kosh/black.html");

    }	
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.menu_settings:
            	finish();
             return true;
            case R.id.black:
                Intent intent = new Intent(Black.this,Black.class);
                startActivity(intent);
                return true;
            case R.id.blue:
                Intent intent1 = new Intent(Black.this,Blue.class);
                startActivity(intent1);
                return true;
            case R.id.white:
                Intent intent2 = new Intent(Black.this,White.class);
                startActivity(intent2);
                return true;
            case R.id.yellow:
                Intent intent3 = new Intent(Black.this,Yellow.class);
                startActivity(intent3);
                return true;
            case R.id.stock:
                Intent intent4 = new Intent(Black.this,OMGOSActivity.class);
                startActivity(intent4);
                return true;
            case R.id.item1:
        		  ChangeLog cl = new ChangeLog(this);
    	            cl.getLogDialog().show();
    	            return true;

                
            default:
                return super.onOptionsItemSelected(item);
        }
        
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) 
   {
      if(keyCode == KeyEvent.KEYCODE_BACK)
      {
          new AlertDialog.Builder(this)
          .setTitle("Really Exit?")
          .setMessage("Are you sure you want to exit?")
          .setNegativeButton(android.R.string.no, null)
              .setPositiveButton(android.R.string.yes, new OnClickListener() {

                  public void onClick(DialogInterface arg0, int arg1) {
                      //White.super.onBackPressed();
                      Intent intent = new Intent(Intent.ACTION_MAIN);
                      intent.addCategory(Intent.CATEGORY_HOME);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                       startActivity(intent);
                  }
              }).create().show();

          return true;
        }
        return false;
   }

}
