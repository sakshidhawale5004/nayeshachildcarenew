<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep therapy copy and distinct home/detail imagery in a shared service-data module so all six pages stay consistent.
- Render the first-visit 3D children-playing scene only after mount, because WebGL needs the browser while content pages remain server-renderable.
- Save public appointment requests through a validated server function into a private Cloud table; parents need no account and their contact details must not be publicly readable.
- Run the therapy guide through a validated public server function with server-only AI Gateway helpers; it returns non-diagnostic options without storing children's descriptions.
- Generate therapist activity ideas through a separate validated server function using the existing server-only AI Gateway helper, so session goals are not stored and AI suggestions remain distinct from parent intake.
