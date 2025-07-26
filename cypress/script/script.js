"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cypress_1 = require("cypress");
var specFiles = ['cypress/e2e/login.cy.tsx'];
// async function updateInstatusStatus(status) {
//   const validStatuses = ['OPERATIONAL', 'PARTIALOUTAGE', 'MAJOROUTAGE'];
//   if (!validStatuses.includes(status)) {
//     throw new Error(`Statut invalide : ${status}`);
//   }
var COMPONENT_ID = 'cmdfu8jnh0056llvmy1zlqt3g';
var STATUS_PAGE_ID = 'cmdeg1yli004pbl1jukxjzdq4';
var API_KEY = 'a9ee11df5056a9da654905371e933070';
var API_URL = "https://api.instatus.com/v2/".concat(STATUS_PAGE_ID, "/components/").concat(COMPONENT_ID);
//   const res = await fetch(API_URL, {
//   method: 'PUT',
//   headers: {
//       'Authorization': `Bearer ${API_KEY}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       status: status
//     })
//   });
//   if (!res.ok) {
//     const errorBody = await res.text();
//     throw new Error(`Erreur lors de la mise à jour du statut Instatus: ${res.status} - ${errorBody}`);
//   }
// }
// async function runCypressTests() {
//   try {
//     const result = await _run({
//       spec: specFiles.join(','),
//       env: { coverage: 'true' },
//     });
//     if ('runs' in result) {
//       if (result.totalFailed > 0) {
//         await updateInstatusStatus('MAJOROUTAGE');
//         process.exit(1);
//       } else {
//         await updateInstatusStatus('OPERATIONAL');
//         process.exit(0);
//       }
//     } else {
//       await updateInstatusStatus('MAJOROUTAGE');
//       process.exit(1);
//     }
//   } catch (error) {
//     await updateInstatusStatus('MAJOROUTAGE');
//     process.exit(1);
//   }
// }
// runCypressTests();
// Configurations
// const COMPONENT_ID = process.env.INSTATUS_COMPONENT_ID;
// const STATUS_PAGE_ID = process.env.INSTATUS_PAGE_ID;
// const API_KEY = process.env.INSTATUS_API_KEY; // À définir dans les secrets
// const API_URL = `https://api.instatus.com/v2/${STATUS_PAGE_ID}/components/${COMPONENT_ID}`;
// Seuils personnalisables
var STATUS_THRESHOLDS = {
    OPERATIONAL: 0, // 0% d'échec
    DEGRADED: 20, // 1-20% d'échec
    PARTIALOUTAGE: 50, // 21-50% d'échec
    MAJOROUTAGE: 51 // 51-100% d'échec
};
function updateInstatusStatus(status) {
    return __awaiter(this, void 0, void 0, function () {
        var validStatuses, res, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validStatuses = ['OPERATIONAL', 'DEGRADED', 'PARTIALOUTAGE', 'MAJOROUTAGE'];
                    if (!validStatuses.includes(status)) {
                        throw new Error("Statut invalide : ".concat(status));
                    }
                    return [4 /*yield*/, fetch(API_URL, {
                            method: 'PUT',
                            headers: {
                                'Authorization': "Bearer ".concat(API_KEY),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ status: status })
                        })];
                case 1:
                    res = _a.sent();
                    if (!!res.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, res.json()];
                case 2:
                    error = _a.sent();
                    throw new Error("Erreur Instatus: ".concat(res.status, " - ").concat(error || 'Unknown error'));
                case 3: return [2 /*return*/];
            }
        });
    });
}
function determineStatus(failedTests, totalTests) {
    return __awaiter(this, void 0, void 0, function () {
        var failureRate;
        return __generator(this, function (_a) {
            failureRate = (failedTests / totalTests) * 100;
            if (failureRate <= STATUS_THRESHOLDS.DEGRADED)
                return [2 /*return*/, 'OPERATIONAL'];
            if (failureRate <= STATUS_THRESHOLDS.PARTIALOUTAGE)
                return [2 /*return*/, 'DEGRADED'];
            if (failureRate <= STATUS_THRESHOLDS.MAJOROUTAGE)
                return [2 /*return*/, 'PARTIALOUTAGE'];
            return [2 /*return*/, 'MAJOROUTAGE'];
        });
    });
}
function runCypressTests() {
    return __awaiter(this, void 0, void 0, function () {
        var result, failedTests, totalTests, status_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 9]);
                    return [4 /*yield*/, (0, cypress_1.run)({
                            spec: specFiles.join(','),
                            env: { coverage: 'true' },
                        })];
                case 1:
                    result = _a.sent();
                    if (!('runs' in result)) return [3 /*break*/, 4];
                    failedTests = result.totalFailed;
                    totalTests = result.totalTests;
                    return [4 /*yield*/, determineStatus(failedTests, totalTests)];
                case 2:
                    status_1 = _a.sent();
                    return [4 /*yield*/, updateInstatusStatus(status_1)];
                case 3:
                    _a.sent();
                    process.exit(failedTests > 0 ? 1 : 0);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, updateInstatusStatus('MAJOROUTAGE')];
                case 5:
                    _a.sent();
                    process.exit(1);
                    _a.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    error_1 = _a.sent();
                    return [4 /*yield*/, updateInstatusStatus('MAJOROUTAGE')];
                case 8:
                    _a.sent();
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
runCypressTests();
