import React from 'react';

export const ImprintContent: React.FC = () => {
    return (
        <>
            <div className="content relative w-full">
                <div id="content" className="wpContent mb-10 text-base">
                    <h1>Imprint / Impressum</h1>

                    <p>
                        <br />
                        <strong>
                            Angaben gemäß § 5 TMG
                            <br />
                        </strong>
                        <br />
                        webbar GmbH
                        <br />
                        <br />
                        Geschäftsführer / Directors:
                        <br />
                        Jonathan Arezki // Adrian Stanek
                        <br />
                        <br />
                        Karl-Friedrich-Straße 6<br />
                        77977 Rust
                        <br />
                        HRB 727132
                    </p>

                    <p>
                        <strong>Kontakt</strong>
                        <br />
                        E-Mail: info@webbar.dev
                        <br />
                    </p>

                    <p>
                        <strong>Redaktionell verantwortlich</strong>
                        <br />
                        Adrian Stanek
                        <br />
                        Karl-Friedrich-Straße 6<br />
                        77977 Rust
                    </p>

                    <p>
                        <br />
                        <strong>Quelle</strong>:<br />
                        https://www.e-recht24.de
                    </p>
                </div>

                <div>
                    <h2 className="mt-2 text-primary">Bildnachweise / Licencing-References</h2>
                    Adobe Stock Account: Adrian247668765lsk
                    <ul className="mt-4 text-sm">
                        <li>
                            https://stock.adobe.com/de/images/da-lar-n-zirvesinde-sohbet/121198565
                        </li>
                        <li>
                            https://stock.adobe.com/de/images/congratulate-the-success-of-the-summit/155861743
                        </li>
                        <li>
                            https://stock.adobe.com/de/images/group-of-people-on-peak-mountain-climbing-helping-team-work-travel-trekking-success-business-concept/215484326
                        </li>
                        <li>
                            https://stock.adobe.com/de/images/the-adventures-discoveries-and-achievements-of-the-professional-team-at-high-heights/509974578
                        </li>
                        <li>
                            https://stock.adobe.com/de/images/a-hologram-of-a-summer-cocktail-a-cocktail-of-polygons-triangles-of-points-and-lines-cocktail-icon-low-poly-compound-structure-technology-concept-vector/527128024
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
