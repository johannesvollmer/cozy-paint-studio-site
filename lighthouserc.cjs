const target = process.env["LHCI_URL"] ?? "https://cozy-paint-studio.johannesvollmer.com/";

module.exports = {
  ci: {
    collect: {
      url: [target],
      numberOfRuns: 3,
      settings: {
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        throttlingMethod: "simulate",
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:performance": ["warn", { minScore: 0.75 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 4000 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }],
        "total-byte-weight": ["warn", { maxNumericValue: 10_000_000 }],
      },
    },
    upload: { target: "temporary-public-storage" },
  },
};
