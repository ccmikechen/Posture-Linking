package com.posture_linking.modules.posture;

import android.widget.Toast;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

public class PostureDetectorModule extends ReactContextBaseJavaModule {

  private PostureClassifierFactory postureClassifierFactory;

  public PostureDetectorModule(ReactApplicationContext reactContext) {
    super(reactContext);

    try {
      String info = java.util.Arrays.toString(reactContext.getAssets().list("model"));
      for (int i = 0; i < 100; i++) Log.i("IMPORTANT", info);
    } catch (java.io.IOException e) {

    }

    this.postureClassifierFactory = new PostureClassifierFactory(reactContext.getAssets());
    this.postureClassifierFactory.initAndloadFormalPostureClassifier();
  }

  @Override
  public String getName() {
    return "PostureDetector";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

  @ReactMethod
  public String detect(float[][] data) {
    PostureClassifier classifier =
      (PostureClassifier) this.postureClassifierFactory.getPostureClassifier();

    float[] flattenData = new float[data.length * data[0].length];
    for (int i = 0; i < data.length; i++) {
      System.arraycopy(data[i], 0, flattenData, data.length * i, data[i].length);
    }

    List<Classifier.Recognition> results = classifier.recognizePosture(flattenData);

    return results.get(0).toString();
  }
}
