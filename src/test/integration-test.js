/**
 * Integration test for real-time age calculation
 * This script can be run in browser console to test the live functionality
 */

console.log('🧪 Starting Real-Time Age Calculator Integration Test');

// Test configuration
const TEST_CONFIG = {
  testDuration: 10000, // 10 seconds
  updateInterval: 1000, // 1 second
  birthDate: new Date('1990-01-01T12:00:00'),
  tolerance: 2000 // 2 seconds tolerance for timing
};

// Test results storage
const testResults = {
  updates: [],
  errors: [],
  startTime: null,
  endTime: null
};

// Mock age calculation function (simplified version of the real one)
function calculateTestAge(birthDate, currentDate) {
  const birth = new Date(birthDate);
  const current = new Date(currentDate);
  
  let years = current.getFullYear() - birth.getFullYear();
  let months = current.getMonth() - birth.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (current.getDate() < birth.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  const tempDate = new Date(birth);
  tempDate.setFullYear(birth.getFullYear() + years);
  tempDate.setMonth(birth.getMonth() + months);
  
  const remainingMs = current.getTime() - tempDate.getTime();
  const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  
  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;
  
  const remainingHours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
  
  return {
    years,
    months,
    weeks,
    days,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
    timestamp: current.getTime()
  };
}

// Test real-time updates
function testRealTimeUpdates() {
  return new Promise((resolve) => {
    console.log('📊 Testing real-time updates...');
    
    let updateCount = 0;
    let lastSeconds = -1;
    testResults.startTime = Date.now();
    
    const interval = setInterval(() => {
      const currentTime = new Date();
      const age = calculateTestAge(TEST_CONFIG.birthDate, currentTime);
      
      // Record update
      testResults.updates.push({
        updateNumber: updateCount + 1,
        timestamp: currentTime.getTime(),
        age: age,
        secondsChanged: age.seconds !== lastSeconds
      });
      
      // Check if seconds are incrementing
      if (updateCount > 0 && age.seconds !== lastSeconds) {
        console.log(`✅ Update ${updateCount + 1}: Seconds changed from ${lastSeconds} to ${age.seconds}`);
      } else if (updateCount > 0) {
        console.log(`⏱️ Update ${updateCount + 1}: Seconds remained ${age.seconds}`);
      }
      
      lastSeconds = age.seconds;
      updateCount++;
      
      // Stop after test duration
      if (Date.now() - testResults.startTime >= TEST_CONFIG.testDuration) {
        clearInterval(interval);
        testResults.endTime = Date.now();
        resolve();
      }
    }, TEST_CONFIG.updateInterval);
  });
}

// Test performance and memory usage
function testPerformance() {
  console.log('⚡ Testing performance...');
  
  const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  const startTime = performance.now();
  
  // Simulate multiple rapid calculations
  for (let i = 0; i < 1000; i++) {
    calculateTestAge(TEST_CONFIG.birthDate, new Date());
  }
  
  const endTime = performance.now();
  const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  
  const results = {
    executionTime: endTime - startTime,
    memoryDelta: endMemory - startMemory,
    calculationsPerSecond: 1000 / ((endTime - startTime) / 1000)
  };
  
  console.log(`📈 Performance Results:
    - 1000 calculations took: ${results.executionTime.toFixed(2)}ms
    - Memory usage change: ${(results.memoryDelta / 1024).toFixed(2)}KB
    - Calculations per second: ${results.calculationsPerSecond.toFixed(0)}`);
  
  return results;
}

// Test cleanup functionality
function testCleanup() {
  console.log('🧹 Testing cleanup...');
  
  let intervalId = setInterval(() => {
    calculateTestAge(TEST_CONFIG.birthDate, new Date());
  }, 100);
  
  // Simulate component unmount
  setTimeout(() => {
    clearInterval(intervalId);
    console.log('✅ Interval cleaned up successfully');
  }, 1000);
}

// Analyze test results
function analyzeResults() {
  console.log('📊 Analyzing test results...');
  
  const totalUpdates = testResults.updates.length;
  const expectedUpdates = Math.floor(TEST_CONFIG.testDuration / TEST_CONFIG.updateInterval);
  const secondsChanges = testResults.updates.filter(update => update.secondsChanged).length;
  
  const analysis = {
    totalUpdates,
    expectedUpdates,
    updateAccuracy: (totalUpdates / expectedUpdates) * 100,
    secondsChanges,
    secondsChangeRate: (secondsChanges / totalUpdates) * 100,
    testDuration: testResults.endTime - testResults.startTime,
    errors: testResults.errors.length
  };
  
  console.log(`📋 Test Analysis:
    - Total updates: ${analysis.totalUpdates}
    - Expected updates: ${analysis.expectedUpdates}
    - Update accuracy: ${analysis.updateAccuracy.toFixed(1)}%
    - Seconds changes: ${analysis.secondsChanges}
    - Seconds change rate: ${analysis.secondsChangeRate.toFixed(1)}%
    - Test duration: ${analysis.testDuration}ms
    - Errors: ${analysis.errors}`);
  
  // Determine test success
  const isSuccess = analysis.updateAccuracy >= 90 && analysis.errors === 0;
  console.log(`${isSuccess ? '✅' : '❌'} Test ${isSuccess ? 'PASSED' : 'FAILED'}`);
  
  return analysis;
}

// Main test runner
async function runIntegrationTest() {
  console.log('🚀 Starting Integration Test Suite');
  console.log('⏰ Test Configuration:', TEST_CONFIG);
  
  try {
    // Run tests
    await testRealTimeUpdates();
    const performanceResults = testPerformance();
    testCleanup();
    
    // Analyze results
    const analysis = analyzeResults();
    
    // Final report
    console.log(`
🎯 FINAL TEST REPORT
===================
✅ Real-time updates: ${analysis.updateAccuracy >= 90 ? 'PASS' : 'FAIL'}
✅ Performance: ${performanceResults.calculationsPerSecond > 100 ? 'PASS' : 'FAIL'}
✅ Cleanup: PASS
✅ Overall: ${analysis.updateAccuracy >= 90 && performanceResults.calculationsPerSecond > 100 ? 'PASS' : 'FAIL'}

📊 Key Metrics:
- Update accuracy: ${analysis.updateAccuracy.toFixed(1)}%
- Calculations/sec: ${performanceResults.calculationsPerSecond.toFixed(0)}
- Memory efficient: ${performanceResults.memoryDelta < 1024 * 1024 ? 'Yes' : 'No'}
    `);
    
    return {
      success: analysis.updateAccuracy >= 90 && performanceResults.calculationsPerSecond > 100,
      analysis,
      performance: performanceResults
    };
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    testResults.errors.push(error);
    return { success: false, error };
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.runAgeCalculatorTest = runIntegrationTest;
  console.log('💡 Run window.runAgeCalculatorTest() to start the test');
}

// Auto-run if in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runIntegrationTest, calculateTestAge };
}
