TicketBox v1.2 Safe Update
==========================

部署方式
1. 將 ticketbox 資料夾內的 index.html、manifest.webmanifest、sw.js 上傳到原本 GitHub Pages 專案。
2. 請維持「同一個 GitHub Pages 網址 / 網域」。
3. 不要清除 Safari 的網站資料。
4. 開啟新版後，舊 v1.1 票券會自動保留並補上新版欄位。

v1.2 新功能
- 安全升級：沿用 v1.1 儲存 key
- 第一次啟動建立升級前快照
- 旅程模式：交通、住宿、活動可組成同一旅程
- 同行者欄位
- 年度票券回顧
- 場館圖鑑
- 安全分享（不包含 QR / 條碼與票號）
- 匯出 .ics 行事曆檔
- 複製票券
- 繼續支援 JSON 完整備份與還原

重要
本版資料仍儲存在瀏覽器 localStorage。更新網站檔案本身不會清除資料，但若清除 Safari 網站資料、換網域或更換裝置，localStorage 可能無法保留。建議定期使用「設定 → 匯出備份」。

=== v1.3 主畫面圖示更新 ===
- 新增 iPhone / iPad「加入主畫面」專用 apple-touch-icon。
- 新增 PWA 192x192、512x512 icon 與 favicon。
- 更新 Service Worker 快取版本，避免 Safari 繼續顯示舊圖示。
- 原有票券資料儲存 key 未變更；同一個 GitHub Pages 網址更新時，舊票券資料會繼續保留。

若主畫面已經有舊的 TicketBox 圖示：
1. 先從 iPhone / iPad 主畫面移除舊捷徑（這不會刪除網站內票券資料）。
2. 用 Safari 重新開啟同一個 TicketBox 網址。
3. 分享 → 加入主畫面。
即可看到新版 TicketBox 圖示。
