import { useState } from 'react';
import { shop } from '../shop';
import { copyNow, copyAsync } from '../lib/order';

// Shown after "Send order via Messenger": tells the customer to paste & send,
// with buttons to copy again or reopen Messenger if needed.
export default function OrderSentModal({ message, copied, hasCustom, onCopied, onBack, onDone }) {
  const [justCopied, setJustCopied] = useState(false);

  const copyAgain = async () => {
    const ok = copyNow(message) || (await copyAsync(message));
    if (ok) {
      onCopied();
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1800);
    }
  };

  return (
    <div className="modal-wrap" role="dialog" aria-modal="true" aria-label="Send your order">
      <div className="modal">
        <p className="eyebrow">Almost there</p>
        <h2>Send us your order</h2>
        <p className="modal__status">{copied ? 'Your order is copied.' : 'Tap “Copy order” below first.'}</p>

        <ol className="modal__steps">
          <li>
            <span>
              Open our <strong>Messenger</strong> chat (it opened in a new tab).
            </span>
          </li>
          <li>
            <span>
              <strong>Long-press</strong> the message box and tap <strong>Paste</strong>, then <strong>Send</strong>.
            </span>
          </li>
          {hasCustom && (
            <li>
              <span>
                Send your <strong>design reference photo</strong>, if you have one.
              </span>
            </li>
          )}
        </ol>

        <pre className="modal__summary">{message}</pre>

        <div className="modal__actions">
          <button className="btn btn--line" onClick={copyAgain}>
            {justCopied ? 'Copied ✓' : 'Copy order'}
          </button>
          <a className="btn btn--dark" href={shop.messenger} target="_blank" rel="noreferrer">
            Open Messenger
          </a>
        </div>

        <div className="modal__footer">
          <button className="link-btn" onClick={onBack}>
            ← Edit order
          </button>
          <button className="link-btn" onClick={onDone}>
            I've sent it — clear my order
          </button>
        </div>
      </div>
    </div>
  );
}
