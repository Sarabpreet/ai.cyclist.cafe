window.POS_TRAINING = {
  "title": "Cyclist Café · POS & shift SOP",
  "date": "31 October 2026",
  "slides": [
    {
      "id": "welcome",
      "chapter": "Start here",
      "title": "The café day,<br>done properly",
      "kind": "cover",
      "items": [],
      "lead": "Cyclist Café · POS features & staff operating procedures",
      "notes": "Use this deck for induction and shift refreshers. The required staff operating procedure is Open → Use system → Hand over → Close day. Demonstrate actions using training records only; do not submit test payments, stock changes, payroll or messages into the live café. All amounts and staff examples in this deck are fictional. The deck describes the current local implementation as of 31 October 2026; verify the release before training a different deployment.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "Open → Use system → Hand over → Close day",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "contents",
      "chapter": "Start here",
      "title": "Training route",
      "kind": "contents",
      "items": [],
      "lead": "Start with the daily SOP. Use the reference chapters when needed.",
      "notes": "For every employee: cover the register, orders, kitchen, handover, closing, recovery and own Staff profile. Managers and admins should also cover inventory setup, catalogue, roster, payroll, events and the complete Setup reference. Chapter links are interactive. Use arrow keys to advance, Esc for overview, S for speaker notes and the Chapters button to jump. All slides remain available; access in the actual POS depends on role.",
      "sources": [
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "modules",
      "chapter": "Start here",
      "title": "The workspace at a glance",
      "kind": "modulemap",
      "items": [
        [
          "Home",
          "Register status, tasks, sales, alerts"
        ],
        [
          "POS",
          "Cart, KOTs, payments, invoices"
        ],
        [
          "Kitchen",
          "Accept, prepare, ready, deliver"
        ],
        [
          "Tables",
          "3D / chart, seating, running bills"
        ],
        [
          "Orders",
          "History, reports, printed bills, audit"
        ],
        [
          "People",
          "CRM, purchases, loyalty, notes"
        ],
        [
          "Cash",
          "Cashbook, expenses, movements"
        ],
        [
          "Menu",
          "Products, categories, combos"
        ],
        [
          "Stocks",
          "Goods, ingredients, recipes, suppliers"
        ],
        [
          "Staff",
          "Roster, tasks, leave, pay, documents"
        ],
        [
          "Events",
          "Categories, RSVPs, attendance"
        ],
        [
          "Setup",
          "Register, access, devices, configuration"
        ]
      ],
      "lead": "",
      "notes": "This is the full navigation map. Not every employee sees every module. A missing module may reflect role permissions, not a fault. Home and personal Staff access are available according to the verified account configuration. Recovery is available to verified staff.",
      "sources": [
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "identities",
      "chapter": "Start here",
      "title": "Your login and the drawer are separate",
      "kind": "compare",
      "items": [
        [
          "Signed-in employee",
          "Your account identifies who operates the software and records an action."
        ],
        [
          "Register cashier",
          "The assigned cashier is responsible for physical cash in the open drawer."
        ]
      ],
      "lead": "",
      "notes": "Ask trainees to identify their name in the header and the cashier shown on Home. These can be different. Never share a password to impersonate the cashier. Other authorized staff can build orders, send KOTs and take non-cash payments; cash payments, drawer movements and expenses are restricted to the assigned cashier. Administration has explicit takeover / close override routes with recorded reasons.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "Signing in does not open the register or replace its cashier.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "daily-flow",
      "chapter": "Start here",
      "title": "Follow the register day in four steps",
      "kind": "flow",
      "items": [
        [
          "01",
          "Open",
          "Count the opening cash and accept responsibility."
        ],
        [
          "02",
          "Use system",
          "Record orders, kitchen work, payments and cash movements."
        ],
        [
          "03",
          "Hand over",
          "Count again. The incoming cashier signs in and accepts."
        ],
        [
          "04",
          "Close day",
          "Reconcile the drawer and create the closing record."
        ]
      ],
      "lead": "",
      "notes": "This is the anchor slide for the whole course. A roster shift is a work schedule; the register day is the financial lifecycle of the drawer. A mid-day staff change usually needs a handover, not a close and a new opening. Keep continuity of the register until the café day is reconciled.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "red"
    },
    {
      "id": "staff-rules",
      "chapter": "Start here",
      "title": "Rules every staff member follows",
      "kind": "steps",
      "items": [
        "Use your own account and check who owns the drawer.",
        "Read the order back, including size, shots, milk and notes.",
        "Record cash movements and differences honestly.",
        "Check saved status before retrying a payment or order."
      ],
      "lead": "",
      "notes": "These are staff SOP instructions. The software enforces parts of this, but staff still need to verify the physical cash, the actual bank receipt and the guest’s order. Do not change balances merely to make a difference disappear. Escalate uncertain payments and unresolved conflicts to the person in charge.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts"
      ],
      "callout": "A printer problem is not a reason to collect payment again.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "sign-in",
      "chapter": "Opening",
      "title": "Sign in as yourself",
      "kind": "steps",
      "items": [
        "Enter your staff email and password. Complete verification if shown.",
        "Check that Home shows your name and profile.",
        "Read the register status before taking over the counter."
      ],
      "lead": "",
      "notes": "A successful staff login lands on Home. Password visibility can be toggled on the sign-in form. A schedule assignment does not create credentials. Never use a colleague’s account as a workaround. Do not keep attempting random passwords; ask an admin to check the enabled, linked staff login.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/staff/StaffPanel.tsx",
        "pos_cc/src/modules/staff/WeeklyRoster.tsx",
        "pos_cc/src/modules/staff/RosterCsvTools.tsx",
        "api.cyclist.cafe/api/server/staffManagement.ts"
      ],
      "callout": "If login fails, ask an admin to check Staff → Login.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "home",
      "chapter": "Opening",
      "title": "Start with Home",
      "kind": "compare",
      "items": [
        [
          "Everyday staff",
          "My day shows own sales, assigned tasks, today’s roster, stock alerts, birthdays and quick tips."
        ],
        [
          "Admin overview",
          "Home also shows collections, open bills, kitchen progress, seating, leave requests and operational follow-ups."
        ]
      ],
      "lead": "",
      "notes": "Review the checklist before opening service. A blank task list means none are assigned; it is not permission to skip the café’s physical opening routine. Dashboard sales and alerts come from confirmed data. Refresh if a connection problem leaves an older view visible.",
      "sources": [
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "The register flow shows who is at the counter and what happens next.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "opening-check",
      "chapter": "Opening",
      "title": "Check the counter before opening",
      "kind": "checklist",
      "items": [
        "Sync saved orders on each terminal you will use.",
        "Check the roster, daily tasks and important handover notes.",
        "Check the printer, paper and selected connection.",
        "Review sold-out items, low stock and ingredients to check."
      ],
      "lead": "",
      "notes": "These are operational checks before service. Sync status on one device cannot reveal another device’s unsynced queue. Ask the outgoing staff about their own terminal as well. A printer queue being listed is not proof that the printer has power or paper. Use a test receipt only when an authorized operator is ready for it.",
      "sources": [
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/setup/PrinterSettingsPanel.tsx",
        "pos_cc/src/modules/setup/billTemplates.ts",
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "open-register",
      "chapter": "Opening",
      "title": "Count first, then open the register",
      "kind": "steps",
      "items": [
        "On Home or Setup → Shift, choose Open register.",
        "Count the physical opening float and type that amount.",
        "Acknowledge responsibility, submit and check the confirmed cashier name."
      ],
      "lead": "",
      "notes": "Demonstrate the form without submitting a live opening during training. The opening count may be zero if that is genuinely what was counted. The system assigns the authenticated operator, not a free-text cashier name. The transition needs a connection and saved order queues must be clear. If another terminal changed the register, refresh the review rather than forcing an older view through.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "Use the counted amount, not a remembered or expected amount.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "opening-float",
      "chapter": "Opening",
      "title": "The opening float is cash already in the drawer",
      "kind": "case",
      "items": [
        [
          "₹1,000",
          "Cash physically counted before service"
        ],
        [
          "₹0",
          "Sales collected so far"
        ]
      ],
      "lead": "Training example",
      "notes": "Have a trainee count a fictional set of notes and coins. Enter the actual total. Additions later in the day belong under Add float; removals to the safe belong under Drop to safe. Opening-balance correction exists for an actual opening-entry error, with an audit trail. It is not a tool for hiding a shortage after service.",
      "sources": [
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "Opening float is not a sale.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "cash-authority",
      "chapter": "Opening",
      "title": "Only the assigned cashier handles drawer cash",
      "kind": "table",
      "items": [
        [
          "Create orders / send KOTs",
          "Authorized POS staff"
        ],
        [
          "Record non-cash payments",
          "Authorized POS staff; verify receipt"
        ],
        [
          "Collect cash / split cash",
          "Assigned register cashier"
        ],
        [
          "Cash in, safe drop, cash expenses",
          "Assigned register cashier"
        ]
      ],
      "lead": "",
      "notes": "Permissions still apply to every action. Cash handling is paused when a handover is waiting. An administrator who is not currently responsible should use Take responsibility with a count and reason, or the explicit closing override when appropriate. Do not assume an admin login silently owns the drawer.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "Action",
        "Who performs it"
      ]
    },
    {
      "id": "order-route",
      "chapter": "Orders & payments",
      "title": "Record each guest order once",
      "kind": "flow",
      "items": [
        [
          "01",
          "Choose",
          "Order type, table if dine-in, and customer when relevant."
        ],
        [
          "02",
          "Build",
          "Products, quantities, options, notes and approved discounts."
        ],
        [
          "03",
          "Dispatch",
          "Send the unsent items to kitchen."
        ],
        [
          "04",
          "Settle",
          "Verify payment, mark paid and issue the correct bill."
        ]
      ],
      "lead": "",
      "notes": "The software keeps preparation and payment as separate states. A guest can pay before preparation finishes. For dine-in, verify the selected table before dispatching. For takeaway, the table selector is hidden. Add a customer before using Pay Later or customer-specific loyalty.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "cart",
      "chapter": "Orders & payments",
      "title": "Check the cart before sending",
      "kind": "steps",
      "items": [
        "Search products and use categories or grid/list views.",
        "Check quantities, prices, order type and dine-in table.",
        "Attach the correct Customer, then review the total."
      ],
      "lead": "",
      "notes": "Menu availability and finished-good stock may disable an item that cannot be sold. Product search and category navigation reduce wrong-item selection. Selecting a table can load its running bill: verify its ticket before adding to it. Do not create a second running order just because an existing bill was not noticed.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/tables/TableGrid.tsx",
        "pos_cc/src/modules/tables/CafeFloor3D.tsx",
        "pos_cc/src/utils/orderWorkflow.ts"
      ],
      "callout": "Adding a product returns the POS to the Cart bucket.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "options",
      "chapter": "Orders & payments",
      "title": "Read back the drink customisation",
      "kind": "compare",
      "items": [
        [
          "Choose the options",
          "Size, single/double shot, milk, add-ons and quantities."
        ],
        [
          "Read the preparation notes",
          "Use a clear guest instruction and check it on the cart line."
        ]
      ],
      "lead": "",
      "notes": "Only configured option groups appear. Required selection rules apply to the product. Read dietary information carefully; do not invent allergen assurances from a vegetarian label. If an option or recipe is wrong, tell the authorized menu/stock operator instead of selecting a different item and relying on an unclear note.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/menu/MenuManagement.tsx",
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "A double shot or a milk change can affect both price and ingredient tracking.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "customer-at-pos",
      "chapter": "Orders & payments",
      "title": "Attach the correct customer",
      "kind": "steps",
      "items": [
        "Search an existing customer by name or phone before creating one.",
        "For a new phone, choose the country code; India +91 is the default.",
        "Confirm the guest’s details, then attach the saved profile."
      ],
      "lead": "",
      "notes": "The POS and People support international numbers without rewriting existing customer records. Verify the country selection as well as the digits. Existing Indian customer formats remain searchable. Avoid duplicates and avoid reading personal details aloud unnecessarily. Pay Later requires an attached customer.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/people/PeoplePanel.tsx",
        "pos_cc/src/modules/people/PeopleDirectoryTable.tsx",
        "pos_cc/src/utils/rewardEngine.ts"
      ],
      "callout": "Use the existing profile for loyalty, purchases and outstanding dues.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "send-kot",
      "chapter": "Orders & payments",
      "title": "Send the unsent items to kitchen",
      "kind": "steps",
      "items": [
        "Review the items, table, options and preparation notes.",
        "Choose Send to kitchen, then check the saved ticket and line status.",
        "Follow up in Kitchen if the ticket remains unaccepted or not started."
      ],
      "lead": "",
      "notes": "Newly added lines should remain Unsent KOT until dispatched. A successful KOT send persists the order through the durable journal. A printing failure does not necessarily mean the API save failed. Look up the existing ticket and use its print/recovery controls rather than resubmitting a new order.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts"
      ],
      "callout": "KOT means Kitchen Order Ticket. Sending a KOT does not collect payment.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "extra-kot",
      "chapter": "Orders & payments",
      "title": "An extra item needs a new KOT round",
      "kind": "case",
      "items": [
        [
          "Already sent",
          "1 × Cappuccino belongs to KOT round 1."
        ],
        [
          "Added later",
          "1 × Croissant stays unsent until the next dispatch."
        ],
        [
          "Send again",
          "KOT round 2 contains the newly dispatched lines."
        ]
      ],
      "lead": "",
      "notes": "Use the existing ticket’s cart. The system tracks kitchen rounds so earlier lines and inventory usage are not counted twice. Read a stage-conflict warning if a newer round exists; refresh and review the added items. For a correction to a sent item, use the supported correction flow and tell kitchen staff what changed.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "Do not resend or recreate the original ticket to add one item.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "buckets",
      "chapter": "Orders & payments",
      "title": "Use the right POS bucket",
      "kind": "table",
      "items": [
        [
          "Cart",
          "The order you are building or editing"
        ],
        [
          "Active",
          "Unpaid active bills that still need settlement"
        ],
        [
          "Drafts",
          "Saved, unfinished orders; tap Active three times"
        ],
        [
          "Go back",
          "Return from Drafts to the active-bill view"
        ]
      ],
      "lead": "",
      "notes": "Paid bills leave the POS Active bucket, even when preparation continues in Kitchen. Drafts are deliberately behind three consecutive taps on Active. Tapping another bucket resets that gesture. A draft is not a paid bill and does not reserve stock. Reopen saved work instead of recreating it.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "Bucket",
        "Purpose"
      ]
    },
    {
      "id": "discounts",
      "chapter": "Orders & payments",
      "title": "Use configured discounts only",
      "kind": "steps",
      "items": [
        "Choose an available saved coupon and check its eligible items.",
        "Review combo pricing and any loyalty redemption in the total.",
        "Ask an admin to correct a rule that does not match the offer."
      ],
      "lead": "",
      "notes": "Coupon rules can be store-wide or scoped to selected products/categories and can be enabled or disabled. The POS calculates the discount, GST and total. Do not promise that a coupon combines with a combo or points: use the result actually shown by the configured rules. Server-side validation checks coupon discounts.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/menu/MenuManagement.tsx",
        "pos_cc/src/modules/people/PeoplePanel.tsx",
        "pos_cc/src/modules/people/PeopleDirectoryTable.tsx",
        "pos_cc/src/utils/rewardEngine.ts",
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "There is no free-entry “any percentage” discount for staff.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "cash-payment",
      "chapter": "Orders & payments",
      "title": "Confirm cash before marking paid",
      "kind": "steps",
      "items": [
        "The assigned cashier checks the amount due and cash received.",
        "Use Exact or enter the received amount; verify the displayed change.",
        "Choose Mark paid and wait for confirmation before clearing the transaction."
      ],
      "lead": "",
      "notes": "A handover waiting for acceptance pauses cash handling. Split payments with a cash portion follow the same responsibility rule. If the cash API rejects the operation or the response is uncertain, the cart is retained and the saved operation can be reviewed. Never collect twice because a response was delayed.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts"
      ],
      "callout": "Cash checkout requires a connection and current drawer responsibility.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "digital-payment",
      "chapter": "Orders & payments",
      "title": "Verify non-cash receipt before recording payment",
      "kind": "steps",
      "items": [
        "Check the actual UPI/card receipt or verified online payment state.",
        "Choose the correct method for the payment that was received.",
        "Mark paid once and check the saved result."
      ],
      "lead": "",
      "notes": "This is the required staff verification step for manually recorded digital payments. Provider-verified online flags are server-managed. Do not invent a gateway transaction or mark an unpaid online attempt paid because it has an order number. Escalate a mismatch between the payment provider and POS status.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts"
      ],
      "callout": "A printed bill or a customer’s screenshot is not proof of collection.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "split-payment",
      "chapter": "Orders & payments",
      "title": "Make the split add up to the bill",
      "kind": "case",
      "items": [
        [
          "₹200",
          "Cash portion"
        ],
        [
          "₹300",
          "Digital portion"
        ],
        [
          "₹500",
          "Total collected"
        ]
      ],
      "lead": "Training example · ₹500 total",
      "notes": "In Split, enter the cash and digital components and verify that their sum matches the grand total. Confirm receipt of both components. Do not enter the full bill once as cash and again as digital. The cash drawer expected balance includes only the cash share, while the report retains the payment split.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "The cash portion must be handled by the assigned cashier.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "pay-later",
      "chapter": "Orders & payments",
      "title": "Pay Later records a debt, not a payment",
      "kind": "steps",
      "items": [
        "Attach the guest’s existing Customer profile.",
        "Use Later / Save on tab only under the café’s credit procedure.",
        "Review and settle outstanding dues against the correct customer."
      ],
      "lead": "",
      "notes": "Confirm that the café has authorized credit for this guest; the software’s ability to save on tab is not approval to offer unlimited credit. Referenced dues are reconciled by the API with the parent payment. Do not recreate an old bill or separately mark a transferred bill paid to make it disappear.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/people/PeoplePanel.tsx",
        "pos_cc/src/modules/people/PeopleDirectoryTable.tsx",
        "pos_cc/src/utils/rewardEngine.ts",
        "pos_cc/src/modules/orders/ReportingPanel.tsx",
        "pos_cc/src/workspace/historyAccess.ts"
      ],
      "callout": "An unpaid or transferred balance must not be described as collected cash.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "invoices",
      "chapter": "Orders & payments",
      "title": "Print the correct document for the guest",
      "kind": "table",
      "items": [
        [
          "KOT",
          "What the kitchen should prepare"
        ],
        [
          "Customer invoice",
          "Items, taxes and amount due / recorded payment"
        ],
        [
          "Paid receipt",
          "The confirmed payment state shown on the record"
        ],
        [
          "Corrected invoice",
          "The saved amendment and its adjustment"
        ]
      ],
      "lead": "",
      "notes": "Printing and payment are separate. If paper runs out, first check whether the order/payment saved. Reprint from the existing ticket or Orders when available. Corrected bills show the original total and adjustment. Do not promise a refund simply because a corrected invoice prints; follow the café’s authorized reconciliation process.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/setup/PrinterSettingsPanel.tsx",
        "pos_cc/src/modules/setup/billTemplates.ts",
        "pos_cc/src/modules/orders/ReportingPanel.tsx",
        "pos_cc/src/workspace/historyAccess.ts"
      ],
      "callout": "Reprint the saved bill; do not make another sale to print a copy.",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "Document",
        "What it proves"
      ]
    },
    {
      "id": "kitchen-stages",
      "chapter": "Kitchen & floor",
      "title": "Advance tickets when the work actually happens",
      "kind": "flow",
      "items": [
        [
          "01",
          "Accept",
          "Kitchen has received and checked the KOT."
        ],
        [
          "02",
          "Preparing",
          "Work on the items has started."
        ],
        [
          "03",
          "Ready",
          "Preparation is complete."
        ],
        [
          "04",
          "Delivered",
          "The order has reached the guest / collection point."
        ]
      ],
      "lead": "",
      "notes": "New/Pending → Accepted → Preparing → Ready → Delivered is the kitchen progression. Stages are checked against the current ticket and KOT round. Do not skip stages merely to reduce the queue. Marking Preparing triggers consumption of mapped recipe reservations; an inaccurate stage can distort expected ingredient usage.",
      "sources": [
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "red"
    },
    {
      "id": "two-statuses",
      "chapter": "Kitchen & floor",
      "title": "Payment and preparation have different jobs",
      "kind": "lanes",
      "items": [
        [
          "Payment",
          "Unpaid → Paid",
          "Cashier verifies and records collection."
        ],
        [
          "Kitchen",
          "New → Accepted → Preparing → Ready → Delivered",
          "Kitchen and service staff track fulfilment."
        ]
      ],
      "lead": "",
      "notes": "Payment removes a bill from POS Active because it no longer needs collection. It must not hide a meal that still needs preparing or delivery. Conversely, a delivered order can still need payment. Use the appropriate module rather than altering the other state to remove an entry.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/tables/TableGrid.tsx",
        "pos_cc/src/modules/tables/CafeFloor3D.tsx",
        "pos_cc/src/utils/orderWorkflow.ts"
      ],
      "callout": "A paid meal can still be in Kitchen. That is expected.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "kitchen-followups",
      "chapter": "Kitchen & floor",
      "title": "Follow up on unaccepted or unstarted tickets",
      "kind": "steps",
      "items": [
        "Use Kitchen queue status/mode filters and added-items views.",
        "Check the ticket number, KOT round, items and waiting time.",
        "Speak to the kitchen before retrying a send or changing a status."
      ],
      "lead": "",
      "notes": "History can be inspected by day, week, month or range within the account’s history limit. An overdue indicator is a prompt to investigate, not proof that a second ticket is needed. Keep preparation notes with the correct items. A newer round or stale-stage error needs a fresh ticket review.",
      "sources": [
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/orders/ReportingPanel.tsx",
        "pos_cc/src/workspace/historyAccess.ts"
      ],
      "callout": "Home highlights kitchen follow-ups; Kitchen history has period filters.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "tables",
      "chapter": "Kitchen & floor",
      "title": "Use the floor to find the running bill",
      "kind": "steps",
      "items": [
        "Use the default 3D view or switch to Chart view.",
        "Select a table to create or manage its dine-in ticket.",
        "Check occupancy, seats and the linked bill before moving service on."
      ],
      "lead": "",
      "notes": "The 3D and chart views share the saved table layout. Do not free a table simply because the guest paid if service is still in progress; verify the running bill and fulfilment. Layout editing can manage tables, blocks and plants when authorized. Block names appear on hover/tap; plants do not need names. Layout edits are configuration, not routine bill handling.",
      "sources": [
        "pos_cc/src/modules/tables/TableGrid.tsx",
        "pos_cc/src/modules/tables/CafeFloor3D.tsx",
        "pos_cc/src/utils/orderWorkflow.ts"
      ],
      "callout": "Drag to look around, scroll to zoom, pause/reset the 3D rotation when useful.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "fulfil-and-settle",
      "chapter": "Kitchen & floor",
      "title": "Check both fulfilment and settlement",
      "kind": "table",
      "items": [
        [
          "Paid, still cooking",
          "Continue the existing Kitchen ticket"
        ],
        [
          "Delivered, still unpaid",
          "Collect against the existing bill"
        ],
        [
          "New item after a KOT",
          "Dispatch the new lines on the same ticket"
        ],
        [
          "Table still occupied",
          "Review its running bill and service state"
        ]
      ],
      "lead": "",
      "notes": "This is a staff decision guide, not a shortcut to force table vacancy. A table’s running-order state depends on the recorded fulfilment and settlement status. Pay Later and managed dues transfers have their own credit handling. If the saved state contradicts what physically happened, stop and ask the person in charge to review it.",
      "sources": [
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/tables/TableGrid.tsx",
        "pos_cc/src/modules/tables/CafeFloor3D.tsx",
        "pos_cc/src/utils/orderWorkflow.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "Situation",
        "Correct next action"
      ]
    },
    {
      "id": "orders-history",
      "chapter": "Cash & reports",
      "title": "Find the existing order before acting again",
      "kind": "steps",
      "items": [
        "In Orders, choose Day, Week, Month or Range.",
        "Search the ticket, customer, item or amount; filter payment method.",
        "Sort the list, open details and use the saved order’s actions."
      ],
      "lead": "",
      "notes": "The history restriction also applies across relevant reports, shift archives and activity. It is a server-enforced access limit; changing the date picker cannot unlock older data. Ask an admin for older records. Use the original ticket when investigating a disputed or uncertain payment.",
      "sources": [
        "pos_cc/src/modules/orders/ReportingPanel.tsx",
        "pos_cc/src/workspace/historyAccess.ts",
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "Non-admin accounts can view only the last seven days of history.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "report-tabs",
      "chapter": "Cash & reports",
      "title": "Use the five Orders views for different checks",
      "kind": "table",
      "items": [
        [
          "Orders list",
          "Individual tickets and payment details"
        ],
        [
          "Overview",
          "Sales, paid orders, unpaid pipeline and trends"
        ],
        [
          "Bill Printed",
          "Saved printed-bill evidence"
        ],
        [
          "KOT vs Invoice",
          "Kitchen milestones and bill turnaround"
        ],
        [
          "Timeline",
          "Chronological operational activity"
        ]
      ],
      "lead": "",
      "notes": "Revenue, unpaid estimates and sold-on-credit are different figures. Do not treat pipeline as collected revenue or a sales figure as profit. A printed-bill record is evidence of the print workflow, not a guarantee that paper physically emerged. KOT-to-invoice turnaround and kitchen preparation duration measure different intervals.",
      "sources": [
        "pos_cc/src/modules/orders/ReportingPanel.tsx",
        "pos_cc/src/workspace/historyAccess.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "View",
        "Use it for"
      ]
    },
    {
      "id": "cashbook",
      "chapter": "Cash & reports",
      "title": "Record every drawer movement with its reason",
      "kind": "compare",
      "items": [
        [
          "Cash coming in",
          "Opening float, cash sales, cash share of split payments and Add float."
        ],
        [
          "Cash going out",
          "Drop to safe and cash expenses with an accurate description."
        ]
      ],
      "lead": "",
      "notes": "Use Cash for cashbook entries and expense review; Setup → Shift also offers Add float and Drop to safe. Record the actual movement once. Keep supporting evidence under the café’s procedure. A stock receipt is inventory documentation and must not be duplicated as an unrelated cash expense unless money genuinely left the drawer and is accounted for.",
      "sources": [
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "Only the responsible cashier records drawer movements and cash expenses.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "drawer-math",
      "chapter": "Cash & reports",
      "title": "Expected cash follows the drawer ledger",
      "kind": "equation",
      "items": [
        [
          "Opening float",
          "₹1,000"
        ],
        [
          "Cash sales",
          "+ ₹2,400"
        ],
        [
          "Added float",
          "+ ₹100"
        ],
        [
          "Safe drops",
          "− ₹500"
        ],
        [
          "Cash expenses",
          "− ₹200"
        ]
      ],
      "lead": "",
      "notes": "All values are fictional. Work through the calculation with staff: 1,000 + 2,400 + 100 − 500 − 200 = 2,800. Include the cash share of split sales in cash sales. If the count differs, record the difference and investigate. Do not make an invented expense or edit the opening float to balance it.",
      "sources": [
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "UPI, card and other digital sales do not belong in the physical cash count.",
      "audience": "All staff",
      "tone": "cream",
      "result": [
        "Expected in drawer",
        "₹2,800"
      ]
    },
    {
      "id": "before-handover",
      "chapter": "Handover",
      "title": "Prepare before leaving the counter",
      "kind": "checklist",
      "items": [
        "Finish or explain pending payments and guest issues.",
        "Sync saved work on every terminal involved.",
        "Tell the incoming cashier about open bills, kitchen follow-ups and stock issues.",
        "Count the drawer before requesting handover."
      ],
      "lead": "",
      "notes": "The local UI blocks register transitions while that device has pending/conflicted order work, but the server cannot see unsynced work on another device. Check with each operator. Request handover when the incoming person is available to verify the cash and sign in; avoid leaving the drawer paused unattended.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts",
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "request-handover",
      "chapter": "Handover",
      "title": "The outgoing cashier requests the handover",
      "kind": "steps",
      "items": [
        "Choose Hand over and select the incoming cashier.",
        "Review expected cash, enter the physical count and explain any difference.",
        "Acknowledge the count and request handover."
      ],
      "lead": "",
      "notes": "The incoming list includes active staff with POS access and an enabled linked login. Your own name is omitted because you already own the drawer. The expected balance is read from the API. If the ledger changed during counting, refresh the review, recount if needed and acknowledge the updated amount. The opening float is not reset by handover.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "The outgoing cashier stays responsible until acceptance.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "accept-handover",
      "chapter": "Handover",
      "title": "The incoming cashier accepts using their own login",
      "kind": "steps",
      "items": [
        "Sign in as yourself and open Home.",
        "Choose Review & accept; check the physical count and recorded difference.",
        "Acknowledge responsibility and accept. Verify that your name is now the cashier."
      ],
      "lead": "",
      "notes": "If both employees use one terminal, the outgoing person can sign out and the incoming person signs in. Signing out does not cancel the pending handover. On separate terminals, use the incoming employee’s own authenticated session. Review the cash together before accepting, and keep guest service and drawer security under control.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "One person cannot accept on behalf of the incoming cashier.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "handover-pause",
      "chapter": "Handover",
      "title": "Cash pauses while a handover is waiting",
      "kind": "table",
      "items": [
        [
          "Waiting for the incoming cashier",
          "Ask that person to sign in and review"
        ],
        [
          "Incoming cashier cannot attend",
          "Outgoing cashier or admin cancels the request"
        ],
        [
          "Ledger changed during the review",
          "Cancel, refresh, recount and request again"
        ],
        [
          "Cash payment rejected during handover",
          "Complete or cancel the handover first"
        ]
      ],
      "lead": "",
      "notes": "Cash payments, cash movements and expenses cannot continue through a pending handover. Cancellation returns control to the outgoing cashier; it does not assign the recipient. Never work around a pending handover with another person’s password or a new duplicate order.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "What you see",
        "What to do"
      ]
    },
    {
      "id": "eligible-staff",
      "chapter": "Handover",
      "title": "A cashier needs an active login and POS access",
      "kind": "compare",
      "items": [
        [
          "Missing from the list",
          "Check active staff status, POS access and Staff → Login. The current cashier is excluded."
        ],
        [
          "Outgoing cashier unavailable",
          "An admin can count the drawer and use Take responsibility with a reason."
        ]
      ],
      "lead": "",
      "notes": "Do not use real employee account statuses from this training as permanent examples; they change. If a legacy saved cashier name is not linked to a profile, an administrator can make an explicit counted takeover. This records the administrative action without pretending that the outgoing person accepted it.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/staff/StaffPanel.tsx",
        "pos_cc/src/modules/staff/WeeklyRoster.tsx",
        "pos_cc/src/modules/staff/RosterCsvTools.tsx",
        "api.cyclist.cafe/api/server/staffManagement.ts",
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "A roster assignment or a staff profile alone is not a working login.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "handover-example",
      "chapter": "Handover",
      "title": "Keep the cash difference visible",
      "kind": "case",
      "items": [
        [
          "₹1,500",
          "Expected by the ledger"
        ],
        [
          "₹1,480",
          "Physical cash counted"
        ],
        [
          "− ₹20",
          "Difference recorded with an explanation"
        ]
      ],
      "lead": "Training handover example",
      "notes": "The incoming cashier checks the count and the explanation before accepting. The request and acceptance are retained in Shift Activity, including from/to staff, count, expected cash, difference and note. Handover preserves the register’s financial continuity; acceptance does not erase the shortage.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts"
      ],
      "callout": "Record the ₹20 shortage. Do not rewrite the float to hide it.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "before-close",
      "chapter": "Closing",
      "title": "Resolve the day before you close it",
      "kind": "checklist",
      "items": [
        "Review open bills, Pay Later balances and unresolved guest issues.",
        "Review unfinished kitchen tickets and tell the team what still needs service.",
        "Record actual safe drops, float additions and cash expenses.",
        "Sync every terminal, then count the final physical cash."
      ],
      "lead": "",
      "notes": "This is the café closing SOP; do not claim that every item here is automatically blocked by the software. The API does block closing during a pending handover, unauthorized closing and a stale cash review. Follow the café’s decision for genuine credit balances and remaining fulfilment. Never mark an unpaid bill paid merely to clear a list.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx",
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts"
      ],
      "callout": "Unresolved matters need a clear handoff to the person in charge.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "close-day",
      "chapter": "Closing",
      "title": "Reconcile the cash count and close the day",
      "kind": "steps",
      "items": [
        "Choose Close day from Home or Setup → Shift.",
        "Review expected cash and enter the actual physical count.",
        "Explain a difference, acknowledge the review and wait for the confirmed closed status."
      ],
      "lead": "",
      "notes": "The closing API recomputes sales, cash expenses and movements from authoritative records. If something changed while you counted, refresh the review before trying again. Do not use a previous expected balance as a physical count. A successful close writes the closing archive and lifecycle audit atomically.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts"
      ],
      "callout": "The assigned cashier closes; an admin override needs a recorded reason.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "x-z",
      "chapter": "Closing",
      "title": "X-report is a snapshot; Z-report closes the register",
      "kind": "compare",
      "items": [
        [
          "X-report",
          "An interim view of the open register’s sales, cash movements and expected drawer. Printing it leaves the register open."
        ],
        [
          "Z-report",
          "The final closing record includes actual counted cash, expected cash and variance. It is available in Shift reports / archive."
        ]
      ],
      "lead": "",
      "notes": "The current shared Close day form creates the closing record; it does not promise an automatic physical print. Open the saved Shift report and print/download through its available controls when needed. Historic reports may include denomination counts; the current close form asks for a physical total. Never reopen or make a second close solely to get a paper copy.",
      "sources": [
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/setup/PrinterSettingsPanel.tsx",
        "pos_cc/src/modules/setup/billTemplates.ts"
      ],
      "callout": "A printer failure does not undo a confirmed close.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "logout",
      "chapter": "Closing",
      "title": "Signing out leaves the register as it is",
      "kind": "compare",
      "items": [
        [
          "Hand over",
          "Use this when another cashier will continue the same register day."
        ],
        [
          "Close day",
          "Use this after the day’s cash has been reconciled and the register should stop."
        ]
      ],
      "lead": "",
      "notes": "A responsible cashier receives a reminder before signing out. That reminder can be accepted when another login is required, such as a pending handover, but responsibility remains with the outgoing cashier until acceptance or closure. Secure the counter and confirm that the intended next step has actually completed.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "Logout only ends your login. It never hands over or closes the drawer.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "offline",
      "chapter": "Recovery",
      "title": "If the connection drops, check what was saved",
      "kind": "table",
      "items": [
        [
          "Cash / open / handover / close",
          "Reconnect; these require confirmation"
        ],
        [
          "Cached catalogue and saved work",
          "May remain usable on that device"
        ],
        [
          "Order and KOT updates",
          "Can queue locally; check sync before repeating"
        ],
        [
          "Printing",
          "Depends on the paired transport / local printer service"
        ]
      ],
      "lead": "",
      "notes": "New authentication, authoritative stock commands and register changes need the API. Offline access depends on a previously loaded session/cache; do not promise that every feature works without a network. Keep unconfirmed transactions for review and reconcile actual payment receipts. Bluetooth or other local printing may work if already connected and supported; a remote printer API may not.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts",
        "pos_cc/src/modules/setup/PrinterSettingsPanel.tsx",
        "pos_cc/src/modules/setup/billTemplates.ts"
      ],
      "callout": "Do not clear browser storage or reinstall while saved work is pending.",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "Area",
        "Operating rule"
      ]
    },
    {
      "id": "recovery",
      "chapter": "Recovery",
      "title": "Retry the saved operation, not a new sale",
      "kind": "steps",
      "items": [
        "Open Sync / Recovery and read Pending, To review and print-backup status.",
        "Reconnect and use Retry sync for queued work.",
        "For a conflict, compare Local and Cloud copies before explicit resolution."
      ],
      "lead": "",
      "notes": "A lost response may mean the server saved the operation but the device did not receive its acknowledgement. Stable operation IDs make the same retry safe. Creating a new order or taking a second payment can duplicate business activity. Recovery exports preserve the original queues and print evidence; do not imply that export alone restores data automatically.",
      "sources": [
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "Export a recovery backup before changing devices or resetting the browser.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "error-decisions",
      "chapter": "Recovery",
      "title": "Read the error before choosing the next action",
      "kind": "table",
      "items": [
        [
          "Cashier / handover restriction",
          "Review register responsibility on Home"
        ],
        [
          "Cash ledger changed",
          "Refresh review and recount"
        ],
        [
          "Saved record changed",
          "Keep your draft; reload and compare saved details"
        ],
        [
          "Payment or order response uncertain",
          "Find the saved operation in Recovery"
        ],
        [
          "Printer did not produce paper",
          "Check saved state, transport and paper; reprint"
        ]
      ],
      "lead": "",
      "notes": "Do not repeatedly click a disabled or failed action. If staff cannot confidently reconcile local state, cloud state and the real payment, preserve evidence and ask an admin. A server refusal is a protection against conflicting work, not an instruction to create a different ticket.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts",
        "pos_cc/src/modules/setup/PrinterSettingsPanel.tsx",
        "pos_cc/src/modules/setup/billTemplates.ts",
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "Message / symptom",
        "Correct response"
      ]
    },
    {
      "id": "stock-types",
      "chapter": "Stocks & menu",
      "title": "Track sellable products and raw ingredients separately",
      "kind": "compare",
      "items": [
        [
          "Purchased products",
          "Cakes, pastries or other finished goods are bought outright and counted in sellable pieces / slices."
        ],
        [
          "Raw materials",
          "Coffee, matcha, milk and other ingredients are tracked in saved units through mapped recipes."
        ]
      ],
      "lead": "",
      "notes": "The current supplier model is purchase outright, not consignment. Whole cakes can be received with a sellable slice yield. The product’s tracking mode can be finished stock, recipe-based or untracked. An untracked or unmapped product does not acquire an ingredient recipe automatically.",
      "sources": [
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx",
        "pos_cc/src/modules/menu/MenuManagement.tsx"
      ],
      "callout": "Menu defines what is sold. Stocks records what is physically available.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "stock-daily",
      "chapter": "Stocks & menu",
      "title": "Check stock before it becomes a guest problem",
      "kind": "steps",
      "items": [
        "Review Stocks → Overview, Products and Raw materials.",
        "Use on-hand, reserved, available and low-stock figures correctly.",
        "Report sold-out products and record authorized physical adjustments."
      ],
      "lead": "",
      "notes": "Raw available quantity is on hand less reserved. Low-stock thresholds are configured per item; do not hard-code a number from a sample dashboard. Missing recipes require configuration before dispatch of a recipe-tracked product. No quantities should be guessed. Some production recipes may not yet be mapped; verify configuration before relying on automatic consumption.",
      "sources": [
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx",
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx"
      ],
      "callout": "Raw shortages warn and log; finished goods still enforce available stock.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "receive-stock",
      "chapter": "Stocks & menu",
      "title": "Receive supplier deliveries with a clear record",
      "kind": "steps",
      "items": [
        "Authorized operators record the supplier, invoice and delivery date.",
        "Enter pack quantities, sellable yield or base-unit conversion accurately.",
        "Record batch / expiry where relevant and check the resulting balance."
      ],
      "lead": "",
      "notes": "The supplier model is purchased stock. In Receive purchased stock, distinguish packs from individual sellable units. For example, a cake received as one pack may yield several slices. Stock costs are not exposed to ordinary staff. Delivery/expiry records do not constitute FEFO lot allocation or a live per-batch remaining balance.",
      "sources": [
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "Supplier setup, receiving and purchase costs are admin-controlled.",
      "audience": "Manager / admin reference",
      "tone": "cream"
    },
    {
      "id": "recipes",
      "chapter": "Stocks & menu",
      "title": "Recipe edits apply to future submissions",
      "kind": "case",
      "items": [
        [
          "Version 1",
          "30 g coffee per serving"
        ],
        [
          "Version 2",
          "60 g coffee per serving"
        ],
        [
          "Existing KOT",
          "Keeps its captured recipe version"
        ]
      ],
      "lead": "Training recipe example",
      "notes": "A recipe contains base ingredients per serving and option overrides for size, shots, milk or extras. Saved versions are immutable. A refreshed catalogue pins new dispatched lines to the chosen version; existing sent lines do not retroactively double their usage. Offline terminals retain their cached submitted version. Use 0.03 / 0.06 for these examples if the ingredient’s saved unit is kilograms, not 30 / 60.",
      "sources": [
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "Configure shot, size and milk options in Recipes; never change units casually.",
      "audience": "Manager / admin reference",
      "tone": "cream"
    },
    {
      "id": "stock-consumption",
      "chapter": "Stocks & menu",
      "title": "Kitchen stages drive recipe use",
      "kind": "flow",
      "items": [
        [
          "01",
          "Cart / draft",
          "No ingredient reservation or deduction."
        ],
        [
          "02",
          "Send / accept",
          "Reserve mapped quantities; keep them reserved when accepted."
        ],
        [
          "03",
          "Prepare",
          "Consume the outstanding reservation once."
        ],
        [
          "04",
          "Cancel / waste",
          "Release before preparation; record waste after preparation."
        ]
      ],
      "lead": "",
      "notes": "Ready, delivered or direct completion also consume outstanding reservations if they were not already consumed. Payment does not consume a second time. Extra KOT rounds reserve new lines only. Prepared waste is already part of consumption; do not subtract it twice. A refund does not put prepared ingredients back into stock.",
      "sources": [
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "stock-counts",
      "chapter": "Stocks & menu",
      "title": "Use counts, adjustments and logs for reconciliation",
      "kind": "steps",
      "items": [
        "Count / adjust records a physical count, waste, extra usage or an authorized return.",
        "Choose the correct saved unit and enter a meaningful reason; link a ticket when relevant.",
        "Review Stock logs and Reports by period; load all pages before exporting totals."
      ],
      "lead": "",
      "notes": "Stock count CSV supports review and stale-balance checks. Administrative configuration includes material units, suppliers, recipes and tracking. Authorized stock operators can count and record usage/waste; supplier returns require admin authority. Logs retain balance changes and reasons; physical variance and recipe-estimated usage are different measures. Non-admin history remains limited to seven IST days.",
      "sources": [
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "Count CSV: export, edit quantities, import, review, then apply.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "menu",
      "chapter": "Stocks & menu",
      "title": "Menu owns products, categories and combos",
      "kind": "table",
      "items": [
        [
          "Products",
          "Names, descriptions, prices, images and availability"
        ],
        [
          "Product options",
          "Size, milk, shots, add-ons, notes and selection rules"
        ],
        [
          "Categories",
          "Grouping, display details and default tracking rules"
        ],
        [
          "Combos",
          "Configured bundled items and their deal pricing"
        ]
      ],
      "lead": "",
      "notes": "Menu is catalogue maintenance, not a substitute for an inventory count. Dietary tags, preparation time and order quantity limits are editable where supported. Changes should be deliberate and verified in POS. Configure stock tracking and recipe mapping under Stocks; do not change a price or stock flag to disguise a physical inventory discrepancy.",
      "sources": [
        "pos_cc/src/modules/menu/MenuManagement.tsx",
        "api.cyclist.cafe/docs/INVENTORY.md",
        "pos_cc/src/modules/stocks/StocksPanel.tsx",
        "pos_cc/src/modules/stocks/MaterialsList.tsx"
      ],
      "callout": "Product, category and combo editors have their own URLs.",
      "audience": "Authorized menu operators",
      "tone": "cream",
      "headers": [
        "Menu area",
        "What is managed"
      ]
    },
    {
      "id": "people",
      "chapter": "People & staff",
      "title": "Use one customer profile across service",
      "kind": "table",
      "items": [
        [
          "Directory",
          "Search, sortable columns and customer details"
        ],
        [
          "Activity / Purchases",
          "The guest’s recorded activity and orders"
        ],
        [
          "Points log",
          "Earned, redeemed and adjusted points"
        ],
        [
          "Notes & preferences",
          "Service preferences and internal staff notes"
        ],
        [
          "Events",
          "The profile’s event participation"
        ]
      ],
      "lead": "",
      "notes": "People also includes a leaderboard and an activity ledger. Permissions and the seven-day non-admin history window still apply. Create or edit customer details with care and avoid duplicates. Messaging campaigns and a customer Messages tab are not part of the current People module; do not promise email or WhatsApp sends from a profile.",
      "sources": [
        "pos_cc/src/modules/people/PeoplePanel.tsx",
        "pos_cc/src/modules/people/PeopleDirectoryTable.tsx",
        "pos_cc/src/utils/rewardEngine.ts",
        "pos_cc/src/modules/events/EventsWorkspace.tsx",
        "pos_cc/src/modules/events/EventsPanel.tsx",
        "pos_cc/docs/EVENTS_API.md",
        "pos_cc/src/modules/orders/ReportingPanel.tsx",
        "pos_cc/src/workspace/historyAccess.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "People area",
        "What staff can review"
      ]
    },
    {
      "id": "loyalty",
      "chapter": "People & staff",
      "title": "Apply loyalty through the saved customer record",
      "kind": "steps",
      "items": [
        "Attach the guest before redeeming available points.",
        "Check configured limits and the final payable total.",
        "Use the Points log to investigate changes; explain authorized adjustments."
      ],
      "lead": "",
      "notes": "Welcome bonuses, earning rates, redemption rates and caps are configured business rules, not fixed promises in this deck. The admin reward settings include the programme visibility/status and calculation controls. Staff should not credit points just to compensate for a payment or inventory error; follow the café’s authorized service-recovery procedure.",
      "sources": [
        "pos_cc/src/modules/people/PeoplePanel.tsx",
        "pos_cc/src/modules/people/PeopleDirectoryTable.tsx",
        "pos_cc/src/utils/rewardEngine.ts",
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "Credits, redemptions, visits and purchases must remain attached to the correct person.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "own-profile",
      "chapter": "People & staff",
      "title": "Keep your own staff profile current",
      "kind": "steps",
      "items": [
        "In Staff, update your phone, birthday, bio and profile photo.",
        "Check your employment type and standard hours.",
        "Keep login credentials private and ask an admin about account access."
      ],
      "lead": "",
      "notes": "Employment type and standard hours help roster planning. They are not a clock-in record or an automatic payroll calculation. Staff can edit their allowed personal fields; roles, login configuration, employment terms and salary are managed by authorized admins. Birthdays can appear as compact reminders on Home.",
      "sources": [
        "pos_cc/src/modules/staff/StaffPanel.tsx",
        "pos_cc/src/modules/staff/WeeklyRoster.tsx",
        "pos_cc/src/modules/staff/RosterCsvTools.tsx",
        "api.cyclist.cafe/api/server/staffManagement.ts",
        "pos_cc/src/modules/staff/StaffPayPanel.tsx",
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx"
      ],
      "callout": "Full time: 8 hours. Part time: 6 hours as the standard shift mapping.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "roster",
      "chapter": "People & staff",
      "title": "Use the weekly roster for planned shifts",
      "kind": "steps",
      "items": [
        "Staff review their scheduled days and shift times.",
        "Admins assign 8-hour / 6-hour shifts and can select multiple days.",
        "Admins can repeat a week and import/export roster CSV for editing."
      ],
      "lead": "",
      "notes": "Use the quick shift controls to avoid entering the same duration repeatedly. Review the selected week, dates, staff member and hours before saving or importing. Approved leave is considered during scheduling; resolve conflicts rather than overwriting them blindly. Only the register workflow changes drawer responsibility.",
      "sources": [
        "pos_cc/src/modules/staff/StaffPanel.tsx",
        "pos_cc/src/modules/staff/WeeklyRoster.tsx",
        "pos_cc/src/modules/staff/RosterCsvTools.tsx",
        "api.cyclist.cafe/api/server/staffManagement.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "A roster entry does not open the cash register or assign its cashier.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "tasks",
      "chapter": "People & staff",
      "title": "Complete tasks after the work is done",
      "kind": "steps",
      "items": [
        "Check today’s assigned checklist on Home or Staff → Daily tasks.",
        "Read the task details and due date.",
        "Mark done only after completing the physical work; reopen if necessary."
      ],
      "lead": "",
      "notes": "An empty checklist means that no tasks have been assigned for that view/date. It does not replace cleaning, food-safety or equipment procedures maintained by the café. Those procedures must be supplied by the café; this software training does not invent a food-safety policy.",
      "sources": [
        "pos_cc/src/modules/staff/StaffPanel.tsx",
        "pos_cc/src/modules/staff/WeeklyRoster.tsx",
        "pos_cc/src/modules/staff/RosterCsvTools.tsx",
        "api.cyclist.cafe/api/server/staffManagement.ts",
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx"
      ],
      "callout": "Admins assign the tasks. Staff update their own assigned work.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "leave",
      "chapter": "People & staff",
      "title": "A leave request is not approval",
      "kind": "steps",
      "items": [
        "Submit the correct dates, leave type and reason in Staff → Leave.",
        "Wait for an admin’s Approved or Rejected decision.",
        "Coordinate roster coverage and any register handover separately."
      ],
      "lead": "",
      "notes": "Leave requests are private to the employee and admins. The system checks overlapping pending/approved leave and schedule conflicts. Do not simply miss a rostered shift because a request is Pending. A leave approval does not automatically count the drawer or transfer cash responsibility.",
      "sources": [
        "pos_cc/src/modules/staff/StaffPanel.tsx",
        "pos_cc/src/modules/staff/WeeklyRoster.tsx",
        "pos_cc/src/modules/staff/RosterCsvTools.tsx",
        "api.cyclist.cafe/api/server/staffManagement.ts",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "Only admins review leave. Staff can cancel their own eligible requests.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "pay-documents",
      "chapter": "People & staff",
      "title": "Find your payslips and joining letter in Staff",
      "kind": "compare",
      "items": [
        [
          "Employee view",
          "View your employment details, published salary slips and joining letter; export your payslip as PDF."
        ],
        [
          "Admin workflow",
          "Enter salary, allowances, bonus/overtime and deductions; save a draft or publish the slip. Attach the joining letter PDF."
        ]
      ],
      "lead": "",
      "notes": "Monthly salary can seed the basic amount on a new payslip. The admin still enters and reviews payroll figures; the module does not claim automatic payroll from attendance. Draft payslips remain admin-only; publishing makes them available to the relevant employee. The joining-letter upload is a PDF and the current size limit is 2 MB.",
      "sources": [
        "pos_cc/src/modules/staff/StaffPayPanel.tsx"
      ],
      "callout": "Salary and documents are private to that employee and admins.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "events",
      "chapter": "Events & setup",
      "title": "Manage café events through the shared CRM",
      "kind": "table",
      "items": [
        [
          "Events / Categories",
          "Create and organize café initiatives"
        ],
        [
          "Published event",
          "Appears in upcoming public event listings"
        ],
        [
          "RSVP",
          "Belongs to an existing registered People profile"
        ],
        [
          "Attendance",
          "Review guests, check in / undo check-in, cancel RSVP"
        ]
      ],
      "lead": "",
      "notes": "Event management sits above Setup in the main navigation. Events include date/time, location or online mode, capacity and scheduled/cancelled/postponed/rescheduled status. Public event data uses schema.org Event semantics. Add or locate the guest in People before a staff RSVP. This presentation covers the API/web flow, not an unfinished consumer app.",
      "sources": [
        "pos_cc/src/modules/events/EventsWorkspace.tsx",
        "pos_cc/src/modules/events/EventsPanel.tsx",
        "pos_cc/docs/EVENTS_API.md"
      ],
      "callout": "Current event participation uses free RSVPs with capacity checks.",
      "audience": "Authorized event operators",
      "tone": "cream",
      "headers": [
        "Feature",
        "What happens"
      ]
    },
    {
      "id": "setup-everyday",
      "chapter": "Events & setup",
      "title": "Use the Setup areas your role allows",
      "kind": "table",
      "items": [
        [
          "Shift",
          "Open register, handover, close day, reports and Activity"
        ],
        [
          "Devices",
          "Inspect connected terminal / device information"
        ],
        [
          "Printer",
          "Choose USB, Bluetooth or System and test output"
        ],
        [
          "Recovery",
          "Review queues, retry sync and export a backup"
        ]
      ],
      "lead": "",
      "notes": "The Setup tab list is permission-aware. Recovery is also available through Sync. A stock operator or cashier does not automatically have every admin setting. If a tool is absent, ask an admin to review role permissions instead of using another employee’s login.",
      "sources": [
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx",
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts",
        "pos_cc/src/modules/setup/PrinterSettingsPanel.tsx",
        "pos_cc/src/modules/setup/billTemplates.ts"
      ],
      "callout": "Access, Master and other admin configuration stay restricted.",
      "audience": "All staff",
      "tone": "cream",
      "headers": [
        "Area",
        "Everyday purpose"
      ]
    },
    {
      "id": "printer",
      "chapter": "Events & setup",
      "title": "Check the printer, not just the status label",
      "kind": "steps",
      "items": [
        "Choose USB, Bluetooth or System and the intended printer / pairing.",
        "Check paper width: 58 mm or 80 mm, matching the printer.",
        "Check power and paper, rescan if needed, then print an authorized test receipt."
      ],
      "lead": "",
      "notes": "Printer behavior depends on the device and transport. Follow the actual pairing/queue controls provided on the current terminal. An installed operating-system queue is not a newly paired USB device. If a print fails, check whether the sale saved before retrying. Queue clearing or forgetting a selection should be deliberate, not the first response to a billing problem.",
      "sources": [
        "pos_cc/src/modules/setup/PrinterSettingsPanel.tsx",
        "pos_cc/src/modules/setup/billTemplates.ts"
      ],
      "callout": "“Queue available” does not mean the physical printer is online or paired.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "admin-business",
      "chapter": "Events & setup",
      "title": "Admin settings define the business rules",
      "kind": "table",
      "items": [
        [
          "Access",
          "Role permissions and a route to staff management"
        ],
        [
          "Master",
          "GST / company / FSSAI / invoice details and cart limits"
        ],
        [
          "Discount",
          "Saved coupon rules, scope and enabled state"
        ],
        [
          "Store",
          "Schedule, opening override, checkout availability and order alerts"
        ]
      ],
      "lead": "",
      "notes": "Use the actual saved café rules; do not teach sample tax rates or identifiers as permanent values. Opening hours use IST in the store settings. A store open/closed override is an ordering-availability rule, separate from the staff register’s cash lifecycle. Save deliberately and verify the resulting behavior. Staff should not use a store override to solve a drawer handover issue.",
      "sources": [
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "",
      "audience": "Admin reference",
      "tone": "cream",
      "headers": [
        "Setup tab",
        "Configuration"
      ]
    },
    {
      "id": "connections",
      "chapter": "Events & setup",
      "title": "API, Emails and Messaging have different purposes",
      "kind": "table",
      "items": [
        [
          "API",
          "Inspect the available service / integration reference"
        ],
        [
          "Emails",
          "Preview notification templates and copy/download their HTML"
        ],
        [
          "Messaging",
          "Check email / WhatsApp connection status and send an authorized test"
        ]
      ],
      "lead": "",
      "notes": "Email templates include order confirmation, payment receipt, welcome/onboarding, table-reservation and loyalty-milestone sample designs. A template preview does not prove that delivery is configured. Messaging handles permitted non-secret configuration/status and test sends. Customer-profile message campaigns were removed from People. Verify recipient consent and use only an authorized test recipient; never send a training message to a real guest by accident.",
      "sources": [
        "pos_cc/src/components/EmailTemplatesViewer.tsx",
        "pos_cc/src/modules/setup/MessageConnections.tsx",
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "Provider secrets belong in the backend environment, not a staff form.",
      "audience": "Admin reference",
      "tone": "cream",
      "headers": [
        "Setup tab",
        "Use it for"
      ]
    },
    {
      "id": "music-announcements",
      "chapter": "Events & setup",
      "title": "Use music and announcements deliberately",
      "kind": "compare",
      "items": [
        [
          "Music & devices",
          "Manage configured playback and inspect the intended output device. Provider setup and permissions affect availability."
        ],
        [
          "Announcements",
          "Edit saved operational alerts / promo rotation, select a supported English/Hindi voice and test volume before use."
        ]
      ],
      "lead": "",
      "notes": "Quick operational alerts include order ready, KOT received, opening, closing soon and shift welcome. Saved templates apply to matching automatic alerts. Voice availability depends on the browser/device; select from the supported Google English/Hindi options when available. Do not assume Spotify is connected because a player is visible. Spotify credential/OAuth setup is a separate admin deployment task.",
      "sources": [
        "pos_cc/src/modules/setup/MusicPanel.tsx",
        "pos_cc/src/modules/setup/OperationalAlerts.tsx",
        "pos_cc/src/context/SpotifyAudioContext.tsx",
        "pos_cc/src/workspace/modules.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "pos_cc/src/modules/setup/SetupNavigation.tsx"
      ],
      "callout": "Playing a sample alert is a real audible action. Coordinate with the floor.",
      "audience": "Authorized / admin reference",
      "tone": "cream"
    },
    {
      "id": "bill-layouts",
      "chapter": "Events & setup",
      "title": "Bill previews cover seven print layouts",
      "kind": "table",
      "items": [
        [
          "Customer",
          "Invoice · online payment receipt · corrected invoice"
        ],
        [
          "Kitchen",
          "Compact kitchen ticket / KOT"
        ],
        [
          "Register",
          "Interim X-report · closing Z-report"
        ],
        [
          "Device",
          "Printer test receipt"
        ]
      ],
      "lead": "",
      "notes": "The Bill tab shows the built-in print layouts; it is not evidence that a specific printer is connected or a template editing engine. Customer invoices are compact, and KOT/X/Z layouts keep branding and spacing minimal to save paper. Use the correct saved operational action to generate the actual document.",
      "sources": [
        "pos_cc/src/modules/setup/PrinterSettingsPanel.tsx",
        "pos_cc/src/modules/setup/billTemplates.ts"
      ],
      "callout": "Preview at 58 mm or 80 mm; sample data is not a real transaction.",
      "audience": "Authorized / admin reference",
      "tone": "cream",
      "headers": [
        "Group",
        "Layouts"
      ]
    },
    {
      "id": "scenario-check",
      "chapter": "Staff practice",
      "title": "Choose the next action",
      "kind": "quiz",
      "items": [
        [
          "1",
          "A guest paid, but the drink is still cooking."
        ],
        [
          "2",
          "Your cash count is ₹20 below expected at handover."
        ],
        [
          "3",
          "The incoming cashier is absent from the list."
        ],
        [
          "4",
          "Payment was submitted, then the connection dropped."
        ],
        [
          "5",
          "You sign out while the register is still open."
        ]
      ],
      "lead": "",
      "notes": "Ask staff to answer without looking ahead. Require the operator to name the correct screen and next action, not just repeat a slogan. Use training data for any demonstration. The following slide provides the expected operating responses.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "scenario-answers",
      "chapter": "Staff practice",
      "title": "The correct actions preserve the record",
      "kind": "answers",
      "items": [
        [
          "1",
          "Continue the existing Kitchen ticket; do not create another sale."
        ],
        [
          "2",
          "Record the actual count and shortage note; incoming cashier verifies it."
        ],
        [
          "3",
          "Ask an admin to check active status, POS access and Staff → Login."
        ],
        [
          "4",
          "Review the saved transaction / Recovery before collecting or submitting again."
        ],
        [
          "5",
          "Responsibility remains yours until accepted handover or confirmed close."
        ]
      ],
      "lead": "",
      "notes": "A trainer should ask the employee to explain why each answer avoids a duplicate or an unowned drawer. If the employee cannot distinguish Paid from Ready/Delivered, repeat the two-status slide. If they cannot find the responsible cashier on Home, repeat the login-versus-drawer explanation.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/pos/PosPanel.tsx",
        "pos_cc/src/modules/pos/usePosCheckout.ts",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/kitchen/KdsPanel.tsx",
        "pos_cc/src/utils/orderWorkflow.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "daily-checklist",
      "chapter": "Staff practice",
      "title": "The daily staff checklist",
      "kind": "checklist",
      "items": [
        "Start: own login, roster/tasks, sync, stock/printer check, counted opening.",
        "Service: correct customer/order, clear KOTs, verified payment, honest cash records.",
        "Handover: synced terminals, counted drawer, explained difference, incoming acceptance.",
        "Finish: unresolved matters escalated, final count, reconciled close, saved report."
      ],
      "lead": "",
      "notes": "This is the reusable shift routine for every employee. Managers should assign who checks each terminal and who covers any unresolved guest issue. The one-page checklist is included as a printable HTML/PDF companion. Keep café-specific cleaning, food safety, key custody and cash-safe rules alongside this software SOP.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts",
        "pos_cc/src/modules/dashboard/DashboardPanel.tsx",
        "pos_cc/src/modules/dashboard/PersonalDashboard.tsx",
        "pos_cc/src/modules/dashboard/DashboardOperations.tsx",
        "pos_cc/src/modules/cash/useCashManagement.ts",
        "pos_cc/src/modules/setup/AdminSettings.tsx",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "pos_cc/src/modules/staff/StaffPanel.tsx",
        "pos_cc/src/modules/staff/WeeklyRoster.tsx",
        "pos_cc/src/modules/staff/RosterCsvTools.tsx",
        "api.cyclist.cafe/api/server/staffManagement.ts",
        "pos_cc/src/modules/setup/OrderRecoveryPanel.tsx",
        "pos_cc/src/utils/orderPersistence.ts",
        "pos_cc/src/utils/orderOutbox.ts"
      ],
      "callout": "Use the included one-page checklist at the counter.",
      "audience": "All staff",
      "tone": "cream"
    },
    {
      "id": "finish",
      "chapter": "Staff practice",
      "title": "Open → Use system<br>Hand over → Close day",
      "kind": "finish",
      "items": [],
      "lead": "Know who owns the drawer.<br>Count what is there. Keep every action traceable.",
      "notes": "Finish by having one trainee demonstrate opening, a second explain handover acceptance, and a third explain a failed-payment recovery decision. Record training completion using the café’s own process. This deck does not record or certify attendance automatically. Chapter links and speaker notes can be reused for follow-up training.",
      "sources": [
        "pos_cc/docs/REGISTER_FLOW.md",
        "pos_cc/src/modules/setup/RegisterCashier.tsx",
        "api.cyclist.cafe/api/domain/registerFlow.ts",
        "api.cyclist.cafe/api/domain/cashTransaction.ts",
        "api.cyclist.cafe/api/server/staffOrders.ts"
      ],
      "callout": "",
      "audience": "All staff",
      "tone": "red"
    }
  ],
  "chapters": [
    "Start here",
    "Opening",
    "Orders & payments",
    "Kitchen & floor",
    "Cash & reports",
    "Handover",
    "Closing",
    "Recovery",
    "Stocks & menu",
    "People & staff",
    "Events & setup",
    "Staff practice"
  ]
};
