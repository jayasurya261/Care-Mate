# Fall Detection and Cooldown Explanation

The `FallDetectionAndSMS` component in `src/components/FallDetectionAndSMS.jsx` implements fall detection with a 5-second cooldown period. Here's how it works:

1. The component uses the `react-native-sensors` library to access accelerometer data.

2. A fall is detected when the total acceleration (calculated from x, y, and z components) exceeds the `FALL_DETECTION_THRESHOLD` (set to 50).

3. When a fall is detected, the following happens:
   - "Fall detected!" is logged to the console.
   - The `isCooldown` state is set to `true`, preventing further fall detections.
   - A `setTimeout` is used to set `isCooldown` back to `false` after 5 seconds (defined by `DETECTION_COOLDOWN`).

4. During the 5-second cooldown period, no new falls will be detected because the code checks `!isCooldown` before logging a fall.

5. After the 5-second cooldown, fall detection resumes normally.

This implementation satisfies the requirement of detecting a fall, logging it, and then implementing a 5-second cooldown before detecting falls again.