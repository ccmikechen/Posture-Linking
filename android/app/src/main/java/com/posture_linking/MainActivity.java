package com.posture_linking;

import android.os.Bundle;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

  @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);

        view.setGravity(Gravity.CENTER);
        view.setBackgroundResource(R.drawable.launch_screen);

        return view;
    }
}
