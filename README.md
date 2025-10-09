# bikepoistenie.sk — statická landing stránka (GitHub Pages)

## Rýchly štart
1. Nahrajte všetky súbory tohto archívu do **verejného** GitHub repozitára.
2. V repo: **Settings → Pages → Source = Deploy from a branch**, Branch: `main`, Folder: `/root`.
3. V **Settings → Pages → Custom domain** zadajte `bikepoistenie.sk`.
4. V DNS domény nastavte A záznamy na GitHub Pages:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
   (voliteľne `www` → CNAME na `USERNAME.github.io`)
5. V GitHub Pages zapnite **Enforce HTTPS**.

## Úpravy
- V súbore `index.html` nahraďte `YOUR_FORM_URL` reálnym odkazom na Google Form.
- Texty, telefón, e‑mail a IČO doplňte podľa reality.
- (Voliteľné) Doplňte GA4 ID v `<head>`.

## QR pre predajne
Generujte QR na URL s parametrami, napr.:
`https://bikepoistenie.sk/?utm_source=shop&utm_medium=qr&utm_campaign=bike&shop_id=CYKLO-MARTIN`
