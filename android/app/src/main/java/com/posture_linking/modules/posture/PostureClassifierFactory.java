package com.posture_linking.modules.posture;

import android.os.Environment;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class PostureClassifierFactory {

  private static final String FORMAL_MODEL_INPUT_NAME = "conv2d_1_input";
  private static final String FORMAL_MODEL_OUTPUT_NAME = "output0";
  private static final int FORMAL_MODEL_ROW_SIZE = 17;
  private static final int FORMAL_MODEL_COLUMN_SIZE = 16;
  private static final String FORMAL_MODEL_FILE = "model.pb";

  private Executor executor = Executors.newSingleThreadExecutor();
  private String rootPath;
  private Classifier classifier;

  public PostureClassifierFactory(String rootPath) {
    this.rootPath = rootPath;
  }

  public void initAndloadFormalPostureClassifier(final int classes) {
    executor.execute(new Runnable() {
      @Override
      public void run() {
        try {
          classifier = PostureClassifier.create(
            rootPath,
            FORMAL_MODEL_FILE,
            FORMAL_MODEL_ROW_SIZE,
            FORMAL_MODEL_COLUMN_SIZE,
            classes,
            FORMAL_MODEL_INPUT_NAME,
            FORMAL_MODEL_OUTPUT_NAME);
        } catch (final Exception e) {
          throw new RuntimeException("Error initializing TensorFlow! \n" + e.toString(), e);
        }
      }
    });
  }

  public Classifier getPostureClassifier() {
    return this.classifier;
  }

}
