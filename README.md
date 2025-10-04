# 📋 Recipe Sharing App

This is a simple yet functional Angular application for managing and sharing recipes. It supports adding, editing, viewing, and marking recipes as favorites. It uses `json-server` for mock backend data and is styled using Bootstrap.

---

## 🚀 Getting Started

### 🔧 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies:

bash
Copy code
npm install
Start JSON Server:

bash
Copy code
json-server --watch db.json
Runs the mock backend at http://localhost:3000.

Run Angular App:

bash
Copy code
ng serve
Visit http://localhost:4200 in your browser.

📁 Project Structure
graphql
Copy code
src/
├── app/
│   ├── recipe-list/         # Displays list of recipes
│   ├── recipe-card/         # Card component for individual recipe
│   ├── favorites/           # Section for favorite recipes
│   ├── page-not-found/      # 404 page for invalid routes
│   ├── app.component.ts     # Root component
│   ├── master.service.ts    # Shared service for HTTP calls
│   ├── recipes.interface.ts # Recipe model interface
├── assets/
│   └── ...                  # Static assets
├── db.json                  # Mock backend database
└── ...
🧰 Key Angular Features Used
✅ Reactive Forms
Used to manage forms for creating and editing recipes.

ts
Copy code
import { ReactiveFormsModule } from '@angular/forms';
📤📥 Input and Output Decorators
Used for parent-child communication, such as passing data to recipe cards and handling events like viewing or favoriting a recipe.

ts
Copy code
@Input() recipe!: Recipe;
@Output() viewRecipe = new EventEmitter<Recipe>();
@Output() toggleFavorite = new EventEmitter<Recipe>();
♻️ Change Detection
Used ChangeDetectionStrategy.OnPush to improve UI performance and reduce unnecessary DOM updates (if applied).

💉 Dependency Injection
Services like MasterService are injected into components to handle API requests and business logic.

🎨 Styling
The application uses Bootstrap 5 for UI layout and styling. This ensures responsive design and quick styling of components like cards, buttons, forms, and layout grids.

✨ Features
Add new recipes with validation

Edit and delete existing recipes

Mark/unmark recipes as favorites

Filter recipes by favorites

JSON-server backend for fast prototyping

```
