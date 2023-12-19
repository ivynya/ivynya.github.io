<section>
  <a href="https://ivy.direct">
    <img src="https://ivy.direct/favicon.png" alt="">
    <div>
      <b><span>WORK</span> • new portfolio ✨</b>
      <p><code>WEB OK</code><code>API OK</code></p>
    </div>
  </a>
  <a href="https://mura.ivy.direct">
    <img src="https://ivy.direct/data/mura/icon.webp" alt="">
    <div>
      <b><span>MURA</span> • scheduler</b>
      <p><code>WEB OK</code><code>API OK</code></p>
    </div>
  </a>
  <a href="https://ivy.direct/wisdom">
    <img src="https://ivy.direct/data/wisdomduck/icon.webp" alt="">
    <div>
      <b><span>DUCK</span> • wisdom</b>
      <p><code>WEB OK</code><code>API OK</code></p>
    </div>
  </a>
  <p><a href="https://app.ivy.direct/iv3">old personal site (archived)</a></p>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > a {
      @include nm-shadow-sm;
      color: var(--text-accent);
      display: flex;
      gap: 0.75rem;
      margin: 0;
      font-size: 1.15rem;
      padding: 1rem 2rem;
      text-decoration: none;
    }

    img {
      border-radius: var(--border-radius-sm);
      margin-right: 0.5rem;
      height: 3rem;
      width: 3rem;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      line-height: 1.25;

      b {
        color: var(--text-color);
        margin: 0;
      }

      span {
        font-family: cartograph-cf, monospace;
      }

      p {
        display: flex;
        gap: 0.25rem;
        font-size: 0.9rem;
        margin: 0;
      }

      code {
        background-color: var(--background-lighter);
        border: 1px solid var(--background-darker);
        color: var(--text-accent);
        padding: 0.125rem 0.25rem;
      }
    }

    p a {
      color: var(--text-accent);
      font-size: 0.9rem;
      margin: 0;
      text-decoration: none;
    }
  }
</style>
