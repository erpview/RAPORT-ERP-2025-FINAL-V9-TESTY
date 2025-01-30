# Reusable Table Comparison Highlighting Pattern

A reusable pattern for implementing table comparison highlighting in React applications.

## 1. Access Control Pattern

- Visibility controlled by user authentication and permission checks
- Toggle button placement: top-left corner next to modal/component title
- Permission-based feature access (e.g., hasFullAccess or similar permission check)

## 2. Highlighting Implementation

```typescript
// State management
const [highlightDifferences, setHighlightDifferences] = useState(false);

// Comparison logic for different data types
const hasDifferentValues = (values: any[]) => {
  if (values.length < 2) return false;
  const firstValue = values[0]?.value || null;
  return values.some(v => (v?.value || null) !== firstValue);
};

// CSS class assignment based on differences
const getRowClassName = (values: any[]) => {
  if (!highlightDifferences || !hasAccess) return '';
  
  // For simple values (strings, numbers)
  if (typeof values[0] === 'primitive_type') {
    return values.some(v => v !== values[0]) ? 'highlight-class' : '';
  }
  
  // For arrays
  if (Array.isArray(values[0])) {
    return values.some(v => v.join(',') !== values[0].join(',')) ? 'highlight-class' : '';
  }
  
  // For objects
  return hasDifferentValues(values) ? 'highlight-class' : '';
};
```

## 3. UI Components

```tsx
// Toggle button
<button
  onClick={() => setHighlightDifferences(!highlightDifferences)}
  className={`button-class ${highlightDifferences ? 'active-class' : ''}`}
>
  Toggle Differences
</button>

// Table cell with highlighting
<td className={`cell-class ${getRowClassName(rowValues)}`}>
  {content}
</td>
```

## 4. Best Practices

- Always check user permissions before showing highlights
- Handle different data types (strings, arrays, objects)
- Treat null/undefined values consistently
- Use CSS classes for highlighting instead of inline styles
- Consider performance with large datasets
- Make highlight colors configurable via CSS variables

## 5. CSS Example

```css
.highlight-class {
  background-color: var(--highlight-color, #fefce8);
  transition: background-color 0.2s ease;
}

.active-class {
  border-color: var(--active-border-color, #2c3b67);
  color: var(--active-text-color, #2c3b67);
}
```

This pattern can be adapted for any project that needs to compare and highlight differences in tabular data, regardless of the specific data structure or UI framework being used.

## Usage Instructions

1. Copy the relevant code patterns
2. Adjust the types for your data structure
3. Customize the CSS classes and variables
4. Implement your specific permission checks

## Notes

- The highlighting system supports multiple data types including strings, arrays, and objects
- Permission checks ensure that only authorized users can see the differences
- The UI is designed to be intuitive with clear visual feedback
- The code is written in TypeScript for better type safety, but can be used with JavaScript as well
