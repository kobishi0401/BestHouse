# BestHouseTW 專案說明文件

本文件以「使用者與交付對象」為中心，完整說明 BestHouseTW 網站可提供的功能、各技術使用位置與目的、操作方式，以及目前限制與後續擴充方向。  
可直接作為專案交付文件（Project Handover Document）使用。

---

## 1) 專案定位（給資方與非技術讀者）

BestHouseTW 是一個「房地產展示型網站」前端專案，核心目標是：

- 讓一般使用者快速瀏覽房源資訊
- 透過分類篩選提高找房效率
- 提供聯絡與預約入口，導流到銷售服務
- 在手機與桌機上都有基本可用的瀏覽體驗

目前為**純前端靜態網站**，重點在展示與互動，不包含後端資料庫與真實表單送件 API。

---

## 2) 使用者可以做什麼（功能總覽）

### 2.1 首頁（`index.html`）

- 查看主視覺輪播（重點房源）
- 瀏覽精選房源卡片與價格資訊
- 直接前往「物件詳情」與「聯絡我們」
- 填寫預約表單（前端互動示範）

### 2.2 精選房源頁（`properties.html`）

- 依房型快速篩選：
  - 全部
  - 現代公寓（Apartment）
  - 豪華別墅（Villa）
  - 頂樓別墅（Penthouse）
- 點擊卡片可前往物件詳情頁

### 2.3 物件詳情頁（`property-details.html`）

- 查看單一房源的重點資訊（售價、格局、坪數等）
- 了解更完整的物件展示內容
- 進一步導流到聯絡或預約流程

### 2.4 聯絡頁（`contact.html`）

- 查看電話與 Email 聯絡資訊
- 填寫聯絡/預約表單
- 表單送出後顯示前端成功提示訊息（不重整頁面）

---

## 3) 技術架構（技術用在哪裡、為何使用）

以下為本專案「技術 → 使用位置 → 實際用途」對照。

### 3.1 HTML（頁面骨架）

- **使用位置**：
  - `index.html`
  - `properties.html`
  - `property-details.html`
  - `contact.html`
- **用途**：
  - 定義整體頁面內容與區塊結構
  - 建立導覽列、房源卡片、表單、頁尾等可讀內容

### 3.2 CSS（視覺樣式與版面）

- **使用位置**：
  - `assets/css/main-style.css`（主要客製樣式）
  - `assets/css/owl.css`（輪播元件樣式）
  - `assets/css/fontawesome.css`（圖示字型樣式）
- **用途**：
  - 控制品牌風格、色彩、間距、字級、卡片與表單外觀
  - 製作響應式畫面（不同裝置尺寸可用）

### 3.3 Bootstrap（版面系統與基礎元件）

- **使用位置**：
  - `vendor/bootstrap/css/bootstrap.min.css`
  - `vendor/bootstrap/js/bootstrap.min.js`
- **用途**：
  - 使用 Grid 進行欄位切版（例如 `col-lg-*`、`col-md-*`）
  - 提供穩定、跨瀏覽器的前端基礎能力
- **在本專案的實際作用**：
  - 多數主要區塊都建立在 Bootstrap 容器系統上（如 `container`、`row`、`col-*`），讓首頁、房源列表、聯絡頁的欄位在不同螢幕尺寸下維持一致節奏。
  - 響應式斷點（例如 `lg`、`md`）讓桌機可多欄顯示、手機自動堆疊成單欄，減少為每個裝置重寫版面的成本。
  - 搭配既有樣式檔（`main-style.css`）可快速進行品牌客製，不需從零打造整套 CSS 架構。

### 3.4 jQuery（DOM 操作與事件處理）

- **使用位置**：
  - `vendor/jquery/jquery.min.js`
  - `assets/js/custom.js`（大量以 jQuery 實作互動）
- **用途**：
  - 綁定視窗載入、捲動、點擊等事件
  - 控制選單開關、平滑捲動、Preloader 行為
- **在本專案的實際作用**：
  - 頁面載入完成後，移除 Preloader 狀態（改善首次進站觀感）。
  - 監聽捲動位置，動態切換 Header 樣式（增加導覽辨識度）。
  - 處理手機版選單展開/收合，確保小螢幕可操作性。
  - 處理錨點平滑捲動，讓同頁面跳轉更自然。
  - 串接 Isotope 與 Owl 等互動行為的初始化流程，集中在 `custom.js` 管理。
- **對使用者與資方的價值**：
  - 使用者：點擊、捲動、切換頁面時互動更順暢，降低操作落差感。
  - 資方：以較少程式碼快速完成常見互動需求，降低前端維護門檻。

### 3.5 Owl Carousel（首頁輪播）

- **使用位置**：
  - `assets/js/owl-carousel.js`
  - `assets/css/owl.css`
  - `assets/js/custom.js` 中的 `.owl-banner` 初始化邏輯
  - 實際掛載於首頁 `index.html`
- **用途**：
  - 建立首頁主視覺輪播，提高重點房源曝光
  - 支援切換按鈕、點點導覽、循環播放
- **在本專案的實際作用**：
  - 首頁主視覺區塊使用 `.owl-banner` 顯示多個重點物件，訪客一進站就能快速看到不同區域與賣點。
  - `custom.js` 內有「條件式初始化」：只有頁面存在 `.owl-banner` 才啟用輪播，避免其他頁面載入時出現不必要錯誤。
  - 透過 `nav`、`dots`、`loop` 設定，兼顧手動切換與自動循環展示，適合展示型官網情境。
- **對使用者與資方的價值**：
  - 使用者：不需切頁即可快速比較多個主打房源，提升資訊吸收效率。
  - 資方：首頁可作為檔期/主打案型曝光入口，後續只要替換輪播內容即可更新行銷重點。

### 3.6 Isotope（房源篩選與排列）

- **使用位置**：
  - `assets/js/isotope.min.js`
  - `assets/js/custom.js` 中 `properties-filter` 點擊篩選邏輯
  - 實際掛載於 `properties.html`
- **用途**：
  - 讓使用者快速依房型過濾房源清單
  - 維持卡片式網格排列與視覺整齊

### 3.7 Font Awesome（圖示）

- **使用位置**：
  - `assets/css/fontawesome.css`
  - 各頁面中的 `<i class="fa ...">` / `<i class="fab ...">`
- **用途**：
  - 顯示電話、社群、行事曆等圖示，提升介面辨識度

### 3.8 Google Fonts（字型）

- **使用位置**：
  - 各 HTML `<head>` 載入 `fonts.googleapis.com`（Poppins）
- **用途**：
  - 統一網站字體風格，提升品牌一致性

---

## 4) 目錄結構（交付時快速理解）

```text
BestHouseTW/
├─ index.html                  # 首頁
├─ properties.html             # 房源列表與篩選
├─ property-details.html       # 單一房源詳情
├─ contact.html                # 聯絡頁與表單
├─ assets/
│  ├─ css/
│  │  ├─ main-style.css        # 主樣式（客製重點）
│  │  ├─ owl.css               # 輪播樣式
│  │  └─ fontawesome.css       # 圖示樣式
│  ├─ js/
│  │  ├─ custom.js             # 全站互動主程式
│  │  ├─ owl-carousel.js       # 輪播插件腳本
│  │  └─ isotope.min.js        # 篩選插件腳本
│  └─ images/                  # 圖片素材（房源圖、背景圖、icon）
└─ vendor/
   ├─ bootstrap/               # Bootstrap 第三方套件
   └─ jquery/                  # jQuery 第三方套件
```

---

## 5) 使用手冊（給一般使用者）

### 5.1 如何瀏覽網站

1. 開啟 `index.html`。
2. 從上方導覽列切換到「精選房源 / 物件詳情 / 聯絡我們」。
3. 在精選房源頁可點分類標籤快速篩選。
4. 若要預約或諮詢，可到聯絡頁填寫表單。

### 5.2 表單操作預期

- 當欄位未填完整時，瀏覽器會顯示原生驗證提示。
- 表單送出後，頁面不會重整，會顯示成功提示訊息。
- 目前為前端示範，不會真正送到後端系統。

### 5.3 手機裝置使用

- 右上角選單按鈕可展開/收合導覽列。
- 版面會依螢幕寬度自動調整。

---

## 6) 維護手冊（給接手開發者）

### 6.1 常見修改對應檔案

- 修改網站文案：各 `.html` 檔案
- 修改主視覺與配色：`assets/css/main-style.css`
- 修改互動行為（篩選、選單、表單提示）：`assets/js/custom.js`
- 新增/替換圖片：`assets/images/` 並更新 HTML `src`

### 6.2 前端互動重點（`assets/js/custom.js`）

- Preloader：頁面載入後移除載入效果
- Header 捲動狀態：依 scroll 位置切換 class
- Owl 輪播：僅在有 `.owl-banner` 時初始化，避免其他頁面報錯
- Isotope 篩選：點擊分類後套用 filter，更新 active 狀態
- 聯絡表單：攔截 submit、驗證欄位、顯示成功訊息
- 手機選單：點擊 menu trigger 進行收合切換

