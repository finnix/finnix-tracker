// SPDX-PackageName: finnix-tracker
// SPDX-PackageSupplier: Ryan Finnie <ryan@finnie.org>
// SPDX-PackageDownloadLocation: https://codeberg.org/finnix/finnix-tracker
// SPDX-FileCopyrightText: © 2025 Ryan Finnie <ryan@finnie.org>
// SPDX-License-Identifier: MPL-2.0

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
