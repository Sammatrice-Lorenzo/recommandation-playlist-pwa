import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

const NotFoundPage = () => (
    <Page>
        <Navbar title="Not found" backLink="Back" />
        <Block strong inset>
            <p>Oups</p>
            <p>La page demandé est introuvable.</p>
        </Block>
    </Page>
);

export default NotFoundPage;
