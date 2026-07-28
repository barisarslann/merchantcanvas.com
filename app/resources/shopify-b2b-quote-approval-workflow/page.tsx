import Link from "next/link";
import { ArticleLayout } from "../../components/ArticleLayout";
import { pageMetadata } from "../../lib/metadata";

const title = "A practical Shopify B2B quote approval workflow";
const description =
  "A structured Shopify B2B quote workflow gives each request one record, makes approval thresholds explicit, preserves the buyer decision trail, and converts accepted commercial terms into a Shopify draft order without re-keying.";

export const metadata = pageMetadata(
  title,
  description,
  "/resources/shopify-b2b-quote-approval-workflow",
);

export default function B2BQuoteWorkflowGuidePage() {
  return (
    <ArticleLayout
      title={title}
      description={description}
      category="B2B operations"
      readingTime="10 min read"
      reviewed="27 July 2026"
      reviewedIso="2026-07-27"
      path="/resources/shopify-b2b-quote-approval-workflow"
      takeaways={[
        "Give each quote one identifier, owner, status, and decision history.",
        "Use explicit approval thresholds and record who decided what.",
        "Separate internal notes from buyer-facing communication.",
        "Convert agreed terms into a Shopify draft order instead of copying them.",
      ]}
    >
      <p className="answer-first">
        A useful Shopify B2B quote approval workflow moves a request through
        defined states—intake, review, approval, buyer decision, and draft-order
        conversion—while keeping buyer, company, pricing, PO, expiry, and
        revision context attached to the same record. The workflow should make
        exceptions visible without becoming a general ERP.
      </p>

      <h2>Why an inbox is not an approval system</h2>
      <p>
        Email is good for communication and poor at representing operational
        state. A message can show that someone replied, but not reliably whether
        the latest pricing was approved, which revision the buyer saw, whether
        the PO number changed, or whether the quote was already converted into a
        draft order.
      </p>
      <p>
        Spreadsheets improve visibility but create another source of truth.
        Product and customer details are copied out of Shopify, commercial
        decisions live in comments or coloured cells, and approved lines are
        later copied back into a draft order. Every handoff creates an
        opportunity for stale data or duplicate work.
      </p>

      <h2>Use a small, explicit status model</h2>
      <p>
        A status should answer what can happen next. Avoid labels that merely
        describe how a person feels about the quote. A practical flow might be:
      </p>
      <div
        className="status-flow"
        role="img"
        aria-label="Quote status flow"
      >
        <span>Draft</span>
        <i aria-hidden="true">→</i>
        <span>Submitted</span>
        <i aria-hidden="true">→</i>
        <span>Needs approval</span>
        <i aria-hidden="true">→</i>
        <span>Approved</span>
        <i aria-hidden="true">→</i>
        <span>Sent</span>
        <i aria-hidden="true">→</i>
        <span>Accepted</span>
        <i aria-hidden="true">→</i>
        <span>Converted</span>
      </div>
      <p>
        Rejected, expired, cancelled, and revision-requested outcomes branch
        from that main path. The important rule is that each transition records
        the actor, time, reason or note where appropriate, and the quote version
        involved.
      </p>

      <h2>Capture enough context at intake</h2>
      <p>
        Quote intake should be narrow enough for a buyer or sales representative
        to complete, but rich enough for the reviewer to make a decision without
        immediately asking for missing basics.
      </p>
      <div className="article-table" role="table" aria-label="Quote intake fields">
        <div role="row" className="article-table-head">
          <span role="columnheader">Context</span>
          <span role="columnheader">Minimum useful information</span>
          <span role="columnheader">Why it matters</span>
        </div>
        <div role="row">
          <span role="cell">Buyer</span>
          <span role="cell">Customer, contact, company, and location where available</span>
          <span role="cell">Identity, catalogue, payment terms, and draft-order handoff</span>
        </div>
        <div role="row">
          <span role="cell">Commercial lines</span>
          <span role="cell">Exact variant or SKU, quantity, reference price, proposed price</span>
          <span role="cell">Totals, discount risk, fulfilment clarity, and conversion</span>
        </div>
        <div role="row">
          <span role="cell">Request terms</span>
          <span role="cell">PO number, expiry, currency, buyer note</span>
          <span role="cell">Buyer process, validity, and audit context</span>
        </div>
        <div role="row">
          <span role="cell">Internal context</span>
          <span role="cell">Owner, internal note, matched approval rule</span>
          <span role="cell">Routing and decision accountability</span>
        </div>
      </div>
      <p>
        Avoid collecting data simply because it might be useful later. Customer
        and company data should be limited to what the quote and draft-order
        workflow needs.
      </p>

      <h2>Make approval rules observable</h2>
      <p>
        The reviewer should be able to see why a quote requires approval. A
        total-value threshold answers a different risk question from a discount
        percentage threshold. Company-specific routing may be useful for
        strategic accounts, while multi-step approval is appropriate only when
        each step represents a real decision right.
      </p>
      <div className="formula-card">
        <span>A rule should state</span>
        <strong>
          Trigger + scope + priority + routing destination + decision required
        </strong>
        <p>
          For example: “Quotes above $20,000 for Company Group A require finance
          review before they can be sent.” This is an illustrative policy, not a
          recommended threshold.
        </p>
      </div>
      <p>
        Do not imply that a routing email is access control unless the system
        enforces identity. If managers can override a step, record the override
        and reason.
      </p>

      <h2>Separate revisions from silent edits</h2>
      <p>
        Before any approval decision, correcting a draft or submitted quote in
        place can be reasonable if the system recalculates totals, re-evaluates
        rules, and records the edit. After a quote has been approved or shown to
        the buyer, a material change should create a linked revision.
      </p>
      <p>
        A revision keeps the previous commercial terms inspectable. It also
        prevents a buyer acceptance from appearing to apply to a version they
        never saw.
      </p>

      <h2>Keep buyer communication narrower than internal review</h2>
      <p>
        A buyer-facing quote view needs the commercial terms, expiry, line
        items, totals, and clear accept, reject, or revision-request actions. It
        should not expose internal notes, approval comments, routing metadata,
        or risk signals.
      </p>
      <p>
        Tokenised links can support a lightweight portal without creating a
        full customer-account system. Tokens should expire, be replaceable,
        avoid storage in raw form where practical, and become invalid after
        terminal decisions.
      </p>

      <h2>When draft orders are better than an unstructured quote inbox</h2>
      <p>
        A Shopify draft order is the right handoff when the commercial terms are
        agreed and the merchant wants Shopify to own the invoice and payment
        link. The quote remains the record of negotiation and approval; the
        draft order becomes the commerce object used to complete the sale.
      </p>
      <p>
        This separation is useful. A quote approval tool does not need to become
        a payment processor, invoice system, or order-management replacement.
        It needs to transfer the agreed customer, company, line, pricing, and
        payment-term context accurately and prevent duplicate conversion.
      </p>

      <h2>Design for exceptions without building an ERP</h2>
      <p>
        The first useful exception set is small: rejection, buyer-requested
        revision, expiration, cancellation, failed draft-order conversion, and
        an unavailable product or variant. Each needs a visible state and a
        recovery path.
      </p>
      <p>
        Broad bidirectional ERP synchronisation, custom portals, file storage,
        sales commissions, and complex identity chains can be deferred until a
        real merchant workflow proves they belong in the product. Scope
        discipline keeps the approval desk understandable.
      </p>

      <h2>Implementation checklist</h2>
      <div className="checklist-card">
        <ul className="check-list">
          <li>Define the quote owner, status model, and permitted transitions</li>
          <li>List the minimum buyer, company, line, price, and PO fields</li>
          <li>Write approval thresholds in policy language before configuring them</li>
          <li>Separate internal comments from buyer-facing notes</li>
          <li>Decide when edits become linked revisions</li>
          <li>Record actor, timestamp, decision, and relevant reason</li>
          <li>Prevent duplicate draft-order conversion</li>
          <li>Test company, location, catalogue, currency, and payment-term context</li>
          <li>Test expired, rejected, revised, and unavailable-item paths</li>
          <li>Limit customer data and document retention and deletion behaviour</li>
        </ul>
      </div>

      <h2>Measure workflow quality, not just quote volume</h2>
      <p>
        Useful operational measures include time from submission to first
        decision, time waiting in each approval step, revision frequency,
        expiry rate, conversion errors, and the share of quotes that reach a
        draft order without manual re-entry. Interpret these measures alongside
        quote complexity and account mix.
      </p>
      <p>
        These metrics describe process health. They do not by themselves prove
        that an approval tool increased revenue or win rate.
      </p>

      <div className="article-cta">
        <div>
          <p className="eyebrow">Related product</p>
          <h2>B2B Quote Approvals</h2>
          <p>
            A focused Shopify Admin approval desk for wholesale quotes and
            Shopify draft-order conversion.
          </p>
        </div>
        <Link className="button button-primary" href="/apps/b2b-quote-approvals">
          Explore B2B Quote Approvals
        </Link>
      </div>
    </ArticleLayout>
  );
}
