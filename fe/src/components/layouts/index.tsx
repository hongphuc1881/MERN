import { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';
import FooterPc from './PcLayout/PcFooter';
import HeaderPc from './PcLayout/PcHeader';
import FooterSp from './SpLayout/SpFooter';
import HeaderSp from './SpLayout/SpHeader';

interface Props {
  children: ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      {isMobile ? (
        <>
          <HeaderSp />
          {children}
          <FooterSp />
        </>
      ) : (
        <>
          <HeaderPc />
          {children}
          <FooterPc />
        </>
      )}
    </div>
  );
}
