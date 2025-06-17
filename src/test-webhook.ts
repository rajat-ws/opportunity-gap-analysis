// Test file for webhook API: https://primary-production-3fc7a.up.railway.app/webhook/opportunity-gap-trigger

const WEBHOOK_URL =
  "https://primary-production-3fc7a.up.railway.app/webhook/opportunity-gap-trigger";

interface TestResult {
  method: string;
  status: number;
  statusText: string;
  data?: any;
  error?: string;
  timestamp: string;
}

class WebhookTester {
  private results: TestResult[] = [];

  async testGET(): Promise<TestResult> {
    console.log("🧪 Testing GET request...");
    const timestamp = new Date().toISOString();

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "WebhookTester/1.0",
        },
      });

      const data = await this.parseResponse(response);

      const result: TestResult = {
        method: "GET",
        status: response.status,
        statusText: response.statusText,
        data,
        timestamp,
      };

      this.results.push(result);
      console.log("✅ GET result:", result);
      return result;
    } catch (error) {
      const result: TestResult = {
        method: "GET",
        status: 0,
        statusText: "Network Error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp,
      };

      this.results.push(result);
      console.log("❌ GET error:", result);
      return result;
    }
  }

  async testPOST(payload?: any): Promise<TestResult> {
    console.log("🧪 Testing POST request...");
    const timestamp = new Date().toISOString();

    const defaultPayload = {
      event: "opportunity-gap-trigger",
      timestamp: timestamp,
      data: {
        message: "Test webhook trigger",
        testId: Math.random().toString(36).substr(2, 9),
      },
    };

    const requestPayload = payload || defaultPayload;

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "WebhookTester/1.0",
        },
        body: JSON.stringify(requestPayload),
      });

      const data = await this.parseResponse(response);

      const result: TestResult = {
        method: "POST",
        status: response.status,
        statusText: response.statusText,
        data,
        timestamp,
      };

      this.results.push(result);
      console.log("✅ POST result:", result);
      return result;
    } catch (error) {
      const result: TestResult = {
        method: "POST",
        status: 0,
        statusText: "Network Error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp,
      };

      this.results.push(result);
      console.log("❌ POST error:", result);
      return result;
    }
  }

  async testPUT(payload?: any): Promise<TestResult> {
    console.log("🧪 Testing PUT request...");
    const timestamp = new Date().toISOString();

    const defaultPayload = {
      event: "opportunity-gap-update",
      timestamp: timestamp,
      data: {
        message: "Test webhook update",
        testId: Math.random().toString(36).substr(2, 9),
      },
    };

    const requestPayload = payload || defaultPayload;

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "WebhookTester/1.0",
        },
        body: JSON.stringify(requestPayload),
      });

      const data = await this.parseResponse(response);

      const result: TestResult = {
        method: "PUT",
        status: response.status,
        statusText: response.statusText,
        data,
        timestamp,
      };

      this.results.push(result);
      console.log("✅ PUT result:", result);
      return result;
    } catch (error) {
      const result: TestResult = {
        method: "PUT",
        status: 0,
        statusText: "Network Error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp,
      };

      this.results.push(result);
      console.log("❌ PUT error:", result);
      return result;
    }
  }

  async testDELETE(): Promise<TestResult> {
    console.log("🧪 Testing DELETE request...");
    const timestamp = new Date().toISOString();

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "WebhookTester/1.0",
        },
      });

      const data = await this.parseResponse(response);

      const result: TestResult = {
        method: "DELETE",
        status: response.status,
        statusText: response.statusText,
        data,
        timestamp,
      };

      this.results.push(result);
      console.log("✅ DELETE result:", result);
      return result;
    } catch (error) {
      const result: TestResult = {
        method: "DELETE",
        status: 0,
        statusText: "Network Error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp,
      };

      this.results.push(result);
      console.log("❌ DELETE error:", result);
      return result;
    }
  }

  private async parseResponse(response: Response): Promise<any> {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      try {
        return await response.json();
      } catch {
        return null;
      }
    } else {
      try {
        return await response.text();
      } catch {
        return null;
      }
    }
  }

  async runAllTests(): Promise<TestResult[]> {
    console.log("🚀 Running all webhook tests...\n");

    await this.testGET();
    await this.testPOST();
    await this.testPUT();
    await this.testDELETE();

    console.log("\n📊 Test Summary:");
    console.table(
      this.results.map((r) => ({
        Method: r.method,
        Status: r.status,
        StatusText: r.statusText,
        HasData: !!r.data,
        HasError: !!r.error,
        Timestamp: r.timestamp,
      }))
    );

    return this.results;
  }

  getResults(): TestResult[] {
    return this.results;
  }

  clearResults(): void {
    this.results = [];
  }
}

// Export for use in other files
export { WebhookTester, type TestResult };

// Example usage functions
export const testWebhookGET = async () => {
  const tester = new WebhookTester();
  return await tester.testGET();
};

export const testWebhookPOST = async (payload?: any) => {
  const tester = new WebhookTester();
  return await tester.testPOST(payload);
};

export const testWebhookPUT = async (payload?: any) => {
  const tester = new WebhookTester();
  return await tester.testPUT(payload);
};

export const testWebhookDELETE = async () => {
  const tester = new WebhookTester();
  return await tester.testDELETE();
};

export const runAllWebhookTests = async () => {
  const tester = new WebhookTester();
  return await tester.runAllTests();
};

// Quick test function for immediate use
export const quickTest = async () => {
  console.log("🔥 Quick webhook test starting...");

  try {
    const result = await testWebhookPOST({
      test: true,
      message: "Quick test from webhook tester",
      timestamp: new Date().toISOString(),
    });

    console.log("🎯 Quick test completed:", result);
    return result;
  } catch (error) {
    console.error("💥 Quick test failed:", error);
    throw error;
  }
};

// For browser console testing
if (typeof window !== "undefined") {
  (window as any).webhookTester = {
    test: quickTest,
    testGET: testWebhookGET,
    testPOST: testWebhookPOST,
    testPUT: testWebhookPUT,
    testDELETE: testWebhookDELETE,
    runAll: runAllWebhookTests,
    WebhookTester,
  };

  console.log("🔧 Webhook tester available in console as 'webhookTester'");
  console.log("Usage examples:");
  console.log("  webhookTester.test() - Quick test");
  console.log("  webhookTester.testPOST() - Test POST");
  console.log("  webhookTester.runAll() - Run all tests");
}
