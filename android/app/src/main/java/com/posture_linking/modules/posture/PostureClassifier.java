package com.posture_linking.modules.posture;

import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Comparator;
import java.util.List;
import java.util.ArrayList;
import java.util.PriorityQueue;

public class PostureClassifier implements Classifier {

  private static final String TAG = "PostureClassifier";

  private static final int MAX_RESULTS = 3;
  private static final float THRESHOLD = 0.1f;

  private String inputName;
  private String outputName;
  private int inputRowSize;
  private int inputColumnSize;

  private float[] outputs;
  private String[] outputNames;

  private MyTensorFlowInferenceInterface inferenceInterface;

  private PostureClassifier() {
  }

  public static Classifier create(
          String rootPath,
          String modelFilename,
          int inputRowSize,
          int inputColumnSize,
          int numClasses,
          String inputName,
          String outputName)
          throws IOException {
    PostureClassifier c = new PostureClassifier();
    c.inputName = inputName;
    c.outputName = outputName;
    String modelPath = rootPath + "/" + modelFilename;
    c.inferenceInterface = new MyTensorFlowInferenceInterface(modelPath);

    c.inputRowSize = inputRowSize;
    c.inputColumnSize = inputColumnSize;

    c.outputNames = new String[]{outputName};
    c.outputs = new float[numClasses + 1];

    return c;
  }

  @Override
  public List<Recognition> recognizePosture(final float[] data) {

      // Copy the input data into TensorFlow.
      inferenceInterface.feed(
              inputName, data, 1, 1, inputColumnSize, inputRowSize);

      // Run the inference call.
      inferenceInterface.run(outputNames);

      // Copy the output Tensor back into the output array.
      inferenceInterface.fetch(outputName, outputs);

      // Find the best classifications.
      PriorityQueue<Recognition> pq =
        new PriorityQueue<Recognition>(
          3,
          new Comparator<Recognition>() {
            @Override
            public int compare(Recognition lhs, Recognition rhs) {
                // Intentionally reversed to put high confidence at the head of the queue.
                return Float.compare(rhs.getConfidence(), lhs.getConfidence());
            }
          });

      for (int i = 0; i < outputs.length; ++i) {
        if (outputs[i] > THRESHOLD) {
          pq.add(
            new Recognition(
              "" + i, "unknown", outputs[i]));
        }
      }

      final ArrayList<Recognition> recognitions = new ArrayList<Recognition>();
      int recognitionsSize = Math.min(pq.size(), MAX_RESULTS);
      for (int i = 0; i < recognitionsSize; ++i) {
        recognitions.add(pq.poll());
      }
      return recognitions;
  }

  public void close() {
    inferenceInterface.close();
  }
}
