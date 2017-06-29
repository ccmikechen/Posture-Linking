package com.posture_linking.modules.posture;

import android.content.res.AssetManager;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class PostureClassifierFactory {

  private static final String FORMAL_MODEL_INPUT_NAME = "input";
  private static final String FORMAL_MODEL_OUTPUT_NAME = "output";
  private static final int FORMAL_MODEL_ROW_SIZE = 20;
  private static final int FORMAL_MODEL_COLUMN_SIZE = 16;
  private static final String FORMAL_MODEL_FILE = "file:///android_asset/modelA.pb";
  private static final String FORMAL_LABEL_FILE = "file:///android_asset/modelA_label_strings.txt";

  private Executor executor = Executors.newSingleThreadExecutor();
  private AssetManager assetManager;

  private Classifier classifier;

  public PostureClassifierFactory(AssetManager assetManager) {
    this.assetManager = assetManager;
  }

  public void initAndloadFormalPostureClassifier() {
    executor.execute(new Runnable() {
      @Override
      public void run() {
        try {
          classifier = PostureClassifier.create(
            assetManager,
            FORMAL_MODEL_FILE,
            FORMAL_LABEL_FILE,
            FORMAL_MODEL_ROW_SIZE,
            FORMAL_MODEL_COLUMN_SIZE,
            FORMAL_MODEL_INPUT_NAME,
            FORMAL_MODEL_OUTPUT_NAME);
        } catch (final Exception e) {
          throw new RuntimeException("Error initializing TensorFlow!", e);
        }
      }
    });
  }

  public Classifier getPostureClassifier() {
    return this.classifier;
  }

}
