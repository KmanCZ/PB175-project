# PB175 TODO APP

## Doporučené technické požadavky

- Node.js verze 20.0.0 nebo vyšší
- Účet u supabase, nebo jejich lokální instanci
- operační systém MacOS, Windows, nebo Linux
- 8GB RAM

## Instalace

1. Založte si supabase projekt např. [zde](https://database.new) nebo lokálně.

2. Naklonujte si projekt skrze git:

```bash
git clone https://github.com/KmanCZ/PB175-project.git
```

3. Přesuňte se do projektové složky

```bash
cd PB175-project
```

4. Nainstalujte závislosti

```bash
npm i
```

5. Přejmenujte `.env.example` na `.env.local` a doplňte hodnoty, které naleznete u svého supabase projektu.

6. Lokální server spustíte:

```bash
npm run dev
```

7. Optimalizovanou verzi aplikace sestavíte:

```bash
npm run build
```

a následně spustíte:

```bash
npm run start
```

## Nasazení do produkce

Pro nasazení veřejně doporučujeme využít [Vercel](https://vercel.com/) u kterého je nasazení bezproblémové.

Mít aplikaci u ostatních poskytovatelů je sice možné, ale potřebuje mnohem více nastavování.