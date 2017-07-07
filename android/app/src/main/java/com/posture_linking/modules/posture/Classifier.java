package com.posture_linking.modules.posture;

import java.util.List;

public interface Classifier {

  public class Recognition {

    private final String id;
    private final String title;
    private final Float confidence;

    public Recognition(final String id, final String title, final Float confidence) {
      this.id = id;
      this.title = title;
      this.confidence = confidence;
    }

    public String getId() {
      return this.id;
    }

    public String getTitle() {
      return this.title;
    }

    public Float getConfidence() {
      return this.confidence;
    }

    @Override
    public String toString() {
      String resultString = "";
      if (id != null) {
        resultString += "[" + id + "] ";
      }

      if (title != null) {
        resultString += title + " ";
      }

      if (confidence != null) {
        resultString += String.format("(%.1f%%) ", confidence * 100.0f);
      }

      return resultString.trim();
    }
  }

  List<Recognition> recognizePosture(float[] data);

  void close();
}
