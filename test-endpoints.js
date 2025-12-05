/**
 * Simple test script for Swagger Proxy Server
 * Run: node test-endpoints.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, symbol, message) {
  console.log(`${colors[color]}${symbol} ${message}${colors.reset}`);
}

async function testEndpoint(name, testFn) {
  try {
    await testFn();
    log('green', '✓', `${name} - PASSED`);
    return true;
  } catch (error) {
    log('red', '✗', `${name} - FAILED: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('\n' + '='.repeat(50));
  log('blue', '🧪', 'Testing Swagger Proxy Server');
  console.log('='.repeat(50) + '\n');

  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  if (await testEndpoint('Health Check (GET /)', async () => {
    const res = await axios.get(`${BASE_URL}/`);
    if (res.data.status !== 'ok') throw new Error('Status not ok');
  })) passed++; else failed++;

  // Test 2: Check Endpoint - Frameable URL
  if (await testEndpoint('Check Frameable URL (POST /check)', async () => {
    const res = await axios.post(`${BASE_URL}/check`, {
      url: 'https://example.com'
    });
    if (typeof res.data.frameable !== 'boolean') throw new Error('Invalid response');
  })) passed++; else failed++;

  // Test 3: Check Endpoint - Non-frameable URL
  if (await testEndpoint('Check Non-frameable URL (POST /check)', async () => {
    const res = await axios.post(`${BASE_URL}/check`, {
      url: 'https://google.com'
    });
    if (typeof res.data.frameable !== 'boolean') throw new Error('Invalid response');
  })) passed++; else failed++;

  // Test 4: Broken Endpoint (Alias)
  if (await testEndpoint('Broken Endpoint (POST /broken)', async () => {
    const res = await axios.post(`${BASE_URL}/broken`, {
      url: 'https://github.com'
    });
    if (typeof res.data.frameable !== 'boolean') throw new Error('Invalid response');
  })) passed++; else failed++;

  // Test 5: Proxy Endpoint
  if (await testEndpoint('Proxy Endpoint (GET /proxy/*)', async () => {
    const res = await axios.get(`${BASE_URL}/proxy/https://example.com`);
    if (!res.data) throw new Error('No data received');
  })) passed++; else failed++;

  // Test 6: Swagger JSON
  if (await testEndpoint('Swagger JSON (GET /api-docs.json)', async () => {
    const res = await axios.get(`${BASE_URL}/api-docs.json`);
    if (!res.data.openapi) throw new Error('Invalid OpenAPI spec');
  })) passed++; else failed++;

  // Test 7: Swagger UI
  if (await testEndpoint('Swagger UI (GET /api-docs)', async () => {
    const res = await axios.get(`${BASE_URL}/api-docs`);
    if (!res.data.includes('swagger-ui')) throw new Error('Swagger UI not found');
  })) passed++; else failed++;

  // Test 8: Error Handling - Missing URL
  if (await testEndpoint('Error Handling - Missing URL', async () => {
    try {
      await axios.post(`${BASE_URL}/check`, {});
      throw new Error('Should have returned 400');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return; // Expected error
      }
      throw error;
    }
  })) passed++; else failed++;

  // Summary
  console.log('\n' + '='.repeat(50));
  log('blue', '📊', 'Test Summary');
  console.log('='.repeat(50));
  log('green', '✓', `Passed: ${passed}`);
  if (failed > 0) {
    log('red', '✗', `Failed: ${failed}`);
  }
  console.log('='.repeat(50) + '\n');

  if (failed === 0) {
    log('green', '🎉', 'All tests passed! Server is working correctly.');
  } else {
    log('yellow', '⚠️', 'Some tests failed. Check the errors above.');
  }

  console.log('\n' + '='.repeat(50));
  log('blue', '📚', 'Next Steps:');
  console.log('='.repeat(50));
  console.log('  1. Open Swagger UI: http://localhost:3000/api-docs');
  console.log('  2. Try the demo page: http://localhost:3000/demo.html');
  console.log('  3. Test in your app: http://localhost:3000/swagger-embed.html');
  console.log('  4. Read SETUP_COMPLETE.md for more info');
  console.log('='.repeat(50) + '\n');
}

// Check if server is running
axios.get(`${BASE_URL}/`)
  .then(() => runTests())
  .catch(() => {
    log('red', '✗', 'Server is not running!');
    console.log('\nPlease start the server first:');
    console.log('  npm start\n');
    process.exit(1);
  });
