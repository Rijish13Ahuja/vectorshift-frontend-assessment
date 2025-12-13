# VectorShift Frontend Technical Assessment

## Overview

This project implements a node-based pipeline builder using **React + React Flow** on the frontend and **FastAPI** on the backend. Users can visually construct pipelines by dragging nodes onto a canvas, connecting them with edges, and submitting the pipeline to a backend service that analyzes its structure.

The solution focuses on **clean abstraction, scalability, and clarity**, closely mirroring how production-grade workflow builders (like VectorShift) are designed.

---

## Tech Stack

### Frontend

* React
* React Flow
* Tailwind CSS
* JavaScript

### Backend

* Python
* FastAPI

---

## Architecture

### Frontend Architecture

The frontend is split into three conceptual layers:

1. **UI / Canvas Layer**

   * `PipelineUI` renders the React Flow canvas
   * Handles node rendering, dragging, and edge creation

2. **Node System**

   * All nodes are implemented using a shared `BaseNode` abstraction
   * Individual node files only define:

     * Handles
     * Internal UI
     * Local state (if any)

3. **Integration Layer**

   * `SubmitButton` reads graph state from React Flow
   * Sends nodes and edges to the backend
   * Displays analysis results to the user

This separation ensures the system is easy to extend without modifying core logic.

---

## Node Abstraction (Part 1)

### BaseNode

`BaseNode` is the core abstraction used by every node in the system.

It centralizes:

* Node container styling
* Title rendering
* Handle rendering
* Layout consistency

Each node passes:

* A `title`
* A list of `handles`
* A `body` JSX element

This eliminates duplicated code and makes it trivial to create new node types.

### Original Nodes

The following original nodes were refactored to use `BaseNode`:

* InputNode
* OutputNode
* LLMNode
* TextNode

### Additional Nodes

To demonstrate scalability of the abstraction, five new nodes were added:

* **NumberNode** – outputs a numeric value
* **MathNode** – accepts two inputs and produces a result
* **ConditionNode** – routes output based on condition
* **DelayNode** – configurable delay node
* **MergeNode** – merges multiple inputs

Each new node was implemented without modifying `BaseNode`, proving the abstraction is flexible and future-proof.

---

## Styling (Part 2)

Styling is handled using **Tailwind CSS**.

Benefits:

* Consistent spacing and typography
* Clean, modern UI
* No custom CSS complexity

Node styling is centralized inside `BaseNode`, ensuring all nodes automatically inherit visual updates.

---

## TextNode Advanced Logic (Part 3)

The TextNode contains the most advanced frontend logic.

### Features

1. **Auto-resizing textarea**

   * The node dynamically grows as text is entered
   * Improves readability and user experience

2. **Variable detection**

   * Variables defined using `{{variableName}}`
   * Parsed using a regular expression

3. **Dynamic handles**

   * Each detected variable generates a left-side input handle
   * Handles update live as text changes

This behavior closely matches VectorShift’s real Text node functionality.

---

## Backend Integration & DAG Validation (Part 4)

### Backend Endpoint

`POST /pipelines/parse`

Accepts:

```json
{
  "nodes": [...],
  "edges": [...]
}
```

Returns:

```json
{
  "num_nodes": number,
  "num_edges": number,
  "is_dag": boolean
}
```

### DAG Detection

The backend:

* Builds a directed graph from edges
* Uses topological sorting (Kahn’s algorithm)
* Compares visited nodes vs total nodes

If all nodes are visited, the graph is a DAG.

This ensures accurate cycle detection for any pipeline structure.

---

## End-to-End Flow

1. User builds a pipeline visually
2. Clicks **Submit**
3. Frontend sends nodes & edges to backend
4. Backend analyzes pipeline structure
5. Frontend displays results in an alert

This completes a full frontend → backend → frontend loop.

---

## Running the Project

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn python-multipart
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Final Notes

This project prioritizes:

* Clean abstractions
* Scalability
* Real-world architecture
* Clear separation of concerns

It is designed to be easily extended with new node types, additional backend validations, or enhanced UI interactions.
