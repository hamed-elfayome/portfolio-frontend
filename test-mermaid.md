# Test Mermaid Diagram

This is a test README with a Mermaid diagram.

## Simple Flowchart

```mermaid
graph TD;
    A[Start] --> B{Decision};
    B -->|Yes| C[Do Something];
    B -->|No| D[Do Something Else];
    C --> E[End];
    D --> E;
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob, how are you?
    B-->>A: Great!
```

## Code Block (Not Mermaid)

```javascript
function hello() {
    console.log("Hello, World!");
}
```

This should work fine.