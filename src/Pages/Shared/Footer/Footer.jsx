import { Link, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')`
  background-color: #333;
  color: #fff;
  padding: ${(props) => props.theme.spacing(5)};
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const FooterRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterLogo = styled('img')`
  width: 100px;
  height: 100px;
  margin-bottom: ${(props) => props.theme.spacing(2)};

  @media (max-width: 600px) {
    margin-bottom: ${(props) => props.theme.spacing(1)};
  }
`;

const FooterSection = styled('div')`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  width: 200px;

  @media (max-width: 600px) {
    margin-bottom: ${(props) => props.theme.spacing(1)};
    width: auto;
  }
`;

const FooterLink = styled(Link)`
  color: #fff;
  margin-left: ${(props) => props.theme.spacing(1)};
  margin-right: ${(props) => props.theme.spacing(1)};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterCopyright = styled('div')`
  background-color: #222;
  color: #fff;
  padding: ${(props) => props.theme.spacing(2)};
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterRow>
        <FooterSection>
          <FooterLogo src="logo.png" style={{height:50}} alt="Wild Survival School " />
          <Typography variant="body2" component="p">
            Explore nature, learn new skills, and have the adventure of a lifetime.
          </Typography>
        </FooterSection>
        <FooterSection>
          <Typography variant="h6" component="h2">
            Contact Us
          </Typography>
          <Typography variant="body2" component="p">
            Email: <FooterLink href="mailto:info@wildsurvivalschool.com">info@survivalskillsschool.com</FooterLink>
          </Typography>
          <Typography variant="body2" component="p">
            Phone: <FooterLink href="tel:+8801912345678">+8801912345678</FooterLink>
          </Typography>
        </FooterSection>
        <FooterSection>
          <Typography variant="h6" component="h2">
            Follow Us
          </Typography>
          <Typography variant="body2" component="p">
            <FooterLink href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</FooterLink>
            |
            <FooterLink href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</FooterLink>
            |
            <FooterLink href="https://www.twitter.com/" target="_blank" rel="noopener">Twitter</FooterLink>
          </Typography>
        </FooterSection>
      </FooterRow>

      <FooterCopyright>
        <Typography variant="body2" component="p">
          &copy; {new Date().getFullYear()} Wild Survival School. All rights reserved.
        </Typography>
      </FooterCopyright>
    </FooterContainer>
  );
}

export default Footer;
