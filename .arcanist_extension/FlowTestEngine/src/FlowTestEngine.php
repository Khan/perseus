<?php

/**
 * A unit test engine that type checks JS code using flow.
 * See https://flowtype.org/ for more info.
 */

final class FlowTestEngine extends ArcanistUnitTestEngine {
    public function run() {
        $projectRoot = $this->getWorkingCopy()->getProjectRoot();
        $flowPath = $projectRoot . "/node_modules/.bin/flow";

        $start = time();
        exec("$flowPath 2>&1", $output, $exitCode);
        $duration = time() - $start;

        $results = [];

        $result = new ArcanistUnitTestResult();
        $result->setName("Flow Test");
        $result->setDuration((float) $duration);

        if ($exitCode === 0) {
            $result->setResult(ArcanistUnitTestResult::RESULT_PASS);
            $result->setUserData(join("\n", $output));
        } else {
            $result->setResult(ArcanistUnitTestResult::RESULT_FAIL);
            $result->setUserData(join("\n", $output));
        }
        $results[] = $result;

        return $results;
    }
}

?>
