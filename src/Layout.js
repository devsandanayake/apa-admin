import React from 'react';
import SideNavbar from './Main/SideNavBar';
import Header from './Header';

export default function Layout({ children }) {
  return (
      <div className={"layout-flex"}>
          {/* <Header /> */}
          <div className={`layout-content`}>
              <div className="flex">
                  <SideNavbar/>
                  <main id="main" class="main w-100">
                      <section class="section dashboard">
                          {children}
                      </section>
                  </main>
              </div>
          </div>
      </div>
  );
}
