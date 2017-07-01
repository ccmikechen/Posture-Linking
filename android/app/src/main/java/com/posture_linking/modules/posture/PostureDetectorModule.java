package com.posture_linking.modules.posture;

import android.widget.Toast;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Callback;

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
  public void detect(ReadableArray array, Callback resultCallback) {
    PostureClassifier classifier =
      (PostureClassifier) this.postureClassifierFactory.getPostureClassifier();

    float[] data = new float[array.size()];
    for (int i = 0; i < array.size(); i++) {
      data[i] = (float) array.getDouble(i);
    }

    List<Classifier.Recognition> results = classifier.recognizePosture(data);

    String result = results.get(0).toString();
    if (results.size() > 1) {
      result += " - " + results.get(1).toString();
    }

    String resultId = results.get(0).getId();

    resultCallback.invoke(result, resultId);
  }
}
