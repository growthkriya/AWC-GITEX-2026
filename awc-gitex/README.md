# AWC Software — GITEX 2026 landing page

Single-page responsive HTML/CSS/JavaScript site with PHP enquiry endpoint. No npm or CDN needed. All images are local; AI portrait and four capability images are cropped from the supplied AWC event posters; the logo is extracted from the supplied corporate deck. Additional technology SVG artwork is included locally. Technology names are styled text rather than official partner logo files.

## Run locally
Install PHP 7.4+ (PHP 8.x recommended), open a terminal in this folder and run:

```sh
php -S localhost:8000 -t .
```
Visit http://localhost:8000. Opening index.html directly previews the site but cannot submit leads.

## Deploy
Upload index.html, lead.php and assets/ to a PHP-enabled hosting document root. By default the endpoint saves lead records to `awc-private-leads/leads.jsonl` in the parent directory of the document root, outside public access. Set the AWC_LEAD_DIR environment variable to an alternative writable private directory if needed. Do not store leads inside the web root. Review permissions and test an actual submission on the host. Each line is a JSON record. The form does not send emails; the team must retrieve the saved records or integrate its CRM/email service. Before public launch, configure server-side rate limiting, HTTPS, monitoring, backup/retention policy and approved privacy notice. No fabricated lead success is displayed: PHP must confirm saving.

### GitHub Pages
The repository's `Deploy to GitHub Pages` workflow publishes the static HTML and assets on pushes to `main` or when run manually. Enable **Settings → Pages → Build and deployment → Source: GitHub Actions** in the repository. The published site is available at https://growthkriya.github.io/AWC-GITEX-2026/. After a successful run, the Pages URL also appears in the workflow run summary and deployment environment. GitHub Pages does not run PHP, so the enquiry form requires a PHP-enabled host and will not submit on the Pages version.

## Content notes
Event dates (7–11 December 2026), UAE, NASSCOM Pavilion and corner POD 9 were supplied in the brief; confirm before publication. Content and contact details follow the supplied AWC corporate deck. Case results are presented as individual engagements, not general guarantees. Confirm current brand approvals and event details before deployment.
