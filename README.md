# **tryflow**

**tryflow** is a lightweight, production-ready utility for handling try-catch-finally blocks in JavaScript/TypeScript. It helps reduce boilerplate, improve error handling, and provide advanced features such as automatic retries, logging, customizable fallback mechanisms and more...

[![NPM Version](https://img.shields.io/npm/v/safe-execute)](https://www.npmjs.com/package/safe-execute)  
[![License](https://img.shields.io/npm/l/safe-execute)](LICENSE)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/safe-execute/ci.yml)](https://github.com/yourusername/safe-execute/actions)  
[![Coverage](https://img.shields.io/codecov/c/github/yourusername/safe-execute)](https://codecov.io/gh/yourusername/safe-execute)

---

## **✨ Features**

✅ **Minimal Boilerplate** – Simplifies error handling with a clean, reusable API.  
✅ **Retries** – Automatically retries failed operations based on configurable rules.  
✅ **Custom Logging** – Integrates logging for better debugging and monitoring.  
✅ **Fallback Mechanism** – Define graceful fallbacks when errors occur.  
✅ **Finally Support** – Execute cleanup logic after execution.  
✅ **Production-Ready** – Designed for real-world applications with TypeScript support.

---

## **📦 Installation**

Install via npm, yarn, pnpm or bun:

```sh
npm install tryflow
# or
yarn add tryflow
# or
pnpm add tryflow
# or
bun add tryflow
```

---

## **🚀 Usage**

### **Basic Example**

```ts
import { safeExecute } from 'tryflow';

const fetchData = async () => {
  return await fetch('https://api.example.com/data').then((res) => res.json());
};

const result = await safeExecute(fetchData, {
  retries: 3,
  fallback: () => ({ error: 'Failed to fetch data' }),
  onError: (error) => console.error('Error occurred:', error),
});

console.log(result);
```

### **Using the Finally Block**

```ts
const result = await safeExecute(
  async () => {
    return await fetch('https://api.example.com/data').then((res) =>
      res.json(),
    );
  },
  {
    retries: 2,
    fallback: () => ({ error: 'Default fallback data' }),
    finally: () => console.log('Execution completed.'),
  },
);
```

---

## **🛠 API Reference**

### **`safeExecute<T>(fn: () => Promise<T>, options?: SafeExecuteOptions<T>): Promise<T | ReturnType<FallbackFunction<T>>>`**

#### **Parameters:**

| Parameter | Type                    | Description                           |
| --------- | ----------------------- | ------------------------------------- |
| `fn`      | `() => Promise<T>`      | The asynchronous function to execute. |
| `options` | `SafeExecuteOptions<T>` | Optional configuration.               |

#### **Options (`SafeExecuteOptions<T>`)**

| Option     | Type                   | Default     | Description                                                           |
| ---------- | ---------------------- | ----------- | --------------------------------------------------------------------- |
| `retries`  | `number`               | `0`         | Number of times to retry execution on failure.                        |
| `fallback` | `() => T`              | `undefined` | Function that returns fallback data in case of failure.               |
| `onError`  | `(error: any) => void` | `undefined` | Custom error logging function.                                        |
| `finally`  | `() => void`           | `undefined` | Function that runs after execution, regardless of success or failure. |

---

## **🧪 Testing**

The package is tested using Jest. To run tests:

```sh
npm test
```

---

## **📜 Contribution Guidelines**

We welcome contributions! 🚀

### **How to Contribute**

1. **Fork the Repository**
2. **Clone Your Fork**
   ```sh
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/tryflow
   cd tryflow
   ```
3. **Install Dependencies**
   ```sh
   pnpm install
   ```
4. **Create a New Branch**
   ```sh
   git checkout -b feature-name
   ```
5. **Make Your Changes**
6. **Run Tests**
   ```sh
   pnpm run test
   ```
7. **Commit and Push**
   ```sh
   git commit -m "feat: added new feature"
   git push origin feature-name
   ```
8. **Create a Pull Request**

---

## **📜 License**

This package is licensed under the **[MIT License](/LICENSE)**.

---

## **📮 Contact & Support**

For issues, feel free to open a [GitHub Issue](https://github.com/Kei-K23/tryflow/issues).
