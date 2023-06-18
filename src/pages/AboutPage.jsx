import {
  Box,
  CardActionArea,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";

const AboutPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h1">About Us</Typography>
      <Typography className="aboutText">
        Welcome to our website! Our platform is dedicated to providing small
        businesses with the resources they need to succeed. We offer a
        user-friendly interface that allows business owners to create and share
        professional-looking cards that showcase their brand and connect with
        potential customers.
        <br />
        <br />
      </Typography>
      <Typography variant="h4" color="red">
        Our Mission
      </Typography>
      <Typography className="aboutText">
        Our mission is to empower small business owners by providing them with
        the tools and resources they need to establish a strong online presence.
        We believe that every business, no matter how small, deserves the
        opportunity to succeed. Our platform is designed to help entrepreneurs
        build their brand, grow their customer base, and achieve their goals.
        <br />
        <br />
      </Typography>
      <Typography variant="h4" color="red">
        How It Works
      </Typography>
      <Typography className="aboutText">
        Our platform is easy to use and requires no technical expertise. Simply
        sign up for an account, and customize your card with your business name,
        logo. Once you're happy with your design, you can publish your card and
        start sharing it with potential customers.
        <br /> <br />
      </Typography>
      <Typography variant="h4" color="red">
        Our Team
      </Typography>
      <Typography className="aboutText">
        We are a team of experienced professionals who are passionate about
        supporting small businesses. Our team includes designers, developers,
        and marketers who are committed to providing our users with the best
        possible experience on our platform. We are always available to answer
        your questions and provide support whenever you need it.
        <br />
        <br />
      </Typography>
      <Typography variant="h4"> Contact Us </Typography>
      <Typography className="aboutText">
        If you have any questions or feedback, we would love to hear from you.
        <br />
        Please feel free to contact us at estybkatz@gmail.com .<br></br> We
        value your input and are always looking for ways to improve our platform
        and better serve our users. <br />
        <br />
        <br />
      </Typography>
      <Typography variant="h2" color="red">
        Site Structure
      </Typography>
      <Typography>
        <br />
      </Typography>
      <Typography variant="h4" color="red">
        The Cards
      </Typography>
      <Typography className="aboutText">
        The cards show a picture chosen by the user, and the phone number and
        address of the business which created the card, which are inputted by
        the user <br /> <br />
        Pressing on the cards moves you the the more information page, which
        brings more information on the business that created the card.
        <br />
        Any user can favorite the cards using the <FavoriteIcon /> who's color
        is changed according to it's status, red if it is favorite, and blue if
        not.
        <br />
        The user who created the card can edit it by pressing the <CreateIcon />
        <br />
        The user who created the card, and all admin users can delete the cards
        pressing on the <DeleteOutlineIcon /> button
      </Typography>
      <Typography variant="h4" color="red">
        The Navbar
      </Typography>
      <Typography className="aboutText">
        The site contains an upper navbar, which changes according to whatever
        the user is logged in or not, which allows navigation to the pages
        allowed for the user.
        <br />
        The Navbar contains a search function, which will search in the current
        page.
        <br />
        If the user is logged in, the navbar contains an avatar which allows the
        user to edit his profile, or logout.
        <br /> The Navbar contains a sun or moon icon, to change the theme of
        the site from dark to light. <br />
        <br />
      </Typography>
      <Typography variant="h4" color="red">
        The Card Pages
      </Typography>
      <Typography className="aboutText">
        The site has 4 different ways to view cards.
        <br /> All the cards in the homepage.
        <br />
        The Fav Cards page, in which you can view your favorite cards.
        <br />
        My Cards page in which you can view the cards you created. <br /> <br />
      </Typography>
      <Typography variant="h4" color="red">
        The Footer
      </Typography>
      <Typography className="aboutText">
        The site contains a footer which links to the about page, and favorites
        page and my cards. <br /> <br />
      </Typography>
      <Typography variant="h4" color="red">
        User types and options
      </Typography>
      <Typography className="aboutText">
        Available options for users This site has 3 types of users, a regular
        user, a business user and an admin user.
        <br />
        All registered users can favorite cards, and view only the cards they
        favorited. A favorited card has the heart shaped favorite button colored
        red, while an unfavorited card has it colored blue. <br /> A user can
        view their favorite cards using favCards page.
        <br />
        A business user can add new cards using the <AddCircleIcon /> button,
        and view the cards he added in the My Cards page.
        <br />
        After creating a card, a business user can edit or delete the cards he
        made.
        <br />
        An Admin user is a business user, which can also delete cards that any
        user made.
        <br />
        When registering you may choose to be a business user or a regular user,
        you cannot become an admin user while registering. To become an admin
        contact us by mail.
        <br /> Any user can edit his profile pages. <br /> <br />
      </Typography>
      <Typography variant="h2" position="center" color="red">
        Here is an example of a card
      </Typography>
      <img src="/assets/images/card.PNG" alt="card" className="aboutCard" />
      {/* <img src="/assets/images/card.PNG" alt="card" /> */}
    </Container>
  );
};

export default AboutPage;
