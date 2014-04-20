--EXPORTED BY DESMOND ON 4/20 1:07AM


-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: sql100.byethost8.com
-- Generation Time: Apr 20, 2014 at 01:07 AM
-- Server version: 5.6.16-64.2-56
-- PHP Version: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `b8_13744073_RankIt`
--

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE IF NOT EXISTS `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rankit_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `size` int(11) NOT NULL,
  `content` mediumblob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `rankit`
--

CREATE TABLE IF NOT EXISTS `rankit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `title` text,
  `winner` varchar(75) NOT NULL,
  `progress_percentage` varchar(10) NOT NULL,
  `options` text NOT NULL,
  `no_factors` tinyint(1) NOT NULL,
  `factor_names` text NOT NULL,
  `factor_weights` text NOT NULL,
  `decisions` text NOT NULL,
  `decision_count` int(11) NOT NULL,
  `scores` text NOT NULL,
  `final_scores` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `rankit`
--

INSERT INTO `rankit` (`id`, `user_id`, `date`, `title`, `winner`, `progress_percentage`, `options`, `no_factors`, `factor_names`, `factor_weights`, `decisions`, `decision_count`, `scores`, `final_scores`) VALUES
(14, '34', '2014-04-17 21:17:12', 'Rick James', 'Silky Johnson', '44', 'Pit Bull,Silky Johnson,Buck Nasty', 0, 'Hating Skill,Eloquence,Style', '0.3333333333333333,0.3333333333333333,0.3333333333333333', 'Silky Johnson.Buck Nasty.Style,Buck Nasty.Pit Bull.Eloquence,Buck Nasty.Silky Johnson.Hating Skill,Pit Bull.Silky Johnson.Eloquence,Pit Bull.Silky Johnson.Style', 5, '500,468.75,500,375,656.25,625,625,375,375', NULL),
(17, '', '2014-04-18 04:11:52', 'Breaking Bad', 'Jesse', '33', 'Jesse,Walt,Squirtle', 0, 'Meth,Speed', '0.5,0.5', 'Jesse.Squirtle.Speed,Walt.Jesse.Speed,Squirtle.Walt.Meth', 3, '500,750,500,375,500,375', NULL),
(19, '33', '2014-04-18 04:25:50', 'Best disney princess', 'Pocahontas', '42', 'Snow White,Cinderella,Pocahontas,Elsa', 0, 'Fashion sense,Diversity', '0.5,0.5', 'Pocahontas.Snow White.Diversity,Pocahontas.Elsa.Fashion sense,Snow White.Elsa.Fashion sense,Cinderella.Snow White.Diversity,Pocahontas.Cinderella.Fashion sense,Cinderella.Elsa.Diversity', 6, '375,500,375,375,750,625,500,500', '437.5,375,687.5,500'),
(20, '', '2014-04-18 04:31:59', 'Is chipotle overrated?', 'Chipotle', '28', 'Taco Bell,Five Guys,McDonalds,Chipotle', 0, 'Interior decor,Freshness,Price', '0.3333333333333333,0.3333333333333333,0.3333333333333333', 'Chipotle.McDonalds.Freshness,Five Guys.McDonalds.Interior decor,Five Guys.McDonalds.Price,Chipotle.Five Guys.Freshness,Five Guys.Chipotle.Price,Taco Bell.Five Guys.Interior decor', 6, '500,500,500,625,375,281.25,375,375,625,500,750,593.75', '500,427.0833333333333,458.3333333333333,614.5833333333333'),
(21, '', '2014-04-18 13:27:31', 'Best disney princess', 'Pocahontas', '42', 'Snow White,Cinderella,Pocahontas,Elsa', 0, 'Fashion sense,Diversity', '0.5,0.5', 'Pocahontas.Snow White.Diversity,Pocahontas.Elsa.Fashion sense,Snow White.Elsa.Fashion sense,Cinderella.Snow White.Diversity,Pocahontas.Cinderella.Fashion sense,Cinderella.Elsa.Diversity', 6, '375,500,375,375,750,625,500,500', '437.5,375,687.5,500'),
(22, '', '2014-04-18 14:22:12', 'Pokemon', 'Squirtle', '11', 'Charmander,Bulbasaur,Squirtle', 0, 'Speed,Defense,Attack', '0.3333333333333333,0.3333333333333333,0.3333333333333333', 'Charmander.Squirtle.Attack,Charmander.Squirtle.Defense', 2, '500,500,375,500,500,500,500,500,625', '458.3333333333333,500,541.6666666666666'),
(23, '', '2014-04-18 18:09:09', 'Breaking Bad', 'Jesse', '33', 'Jesse,Walt,Squirtle', 0, 'Meth,Speed', '0.5,0.5', 'Jesse.Squirtle.Speed,Walt.Jesse.Speed,Squirtle.Walt.Meth', 3, '500,750,500,375,500,375', '625,437.5,437.5'),
(24, '', '2014-04-18 19:27:28', 'Pokemon', 'Charmander', '89', 'Charmander,Bulbasaur,Squirtle', 0, 'Speed,Defense,Attack', '0.3333333333333333,0.3333333333333333,0.3333333333333333', 'Bulbasaur.Squirtle.Attack,Bulbasaur.Charmander.Attack,Bulbasaur.Charmander.Speed,Charmander.Squirtle.Speed,Squirtle.Charmander.Defense,Squirtle.Charmander.Attack,Bulbasaur.Charmander.Defense,Squirtle.Bulbasaur.Defense', 8, '1,2,1,0,1,2,1,0,0', '1.3333333333333333,1,0.3333333333333333'),
(25, '', '2014-04-19 12:32:43', 'Pokemon', 'Charmander', '100', 'Charmander,Bulbasaur,Squirtle', 0, 'Speed,Defense,Attack', '0.3786407766990291,0.14563106796116504,0.47572815533980584', 'Bulbasaur.Squirtle.Attack,Charmander.Squirtle.Defense,Charmander.Squirtle.Attack,Charmander.Bulbasaur.Attack,Bulbasaur.Charmander.Speed,Bulbasaur.Charmander.Defense,Squirtle.Bulbasaur.Defense,Charmander.Squirtle.Speed,Squirtle.Bulbasaur.Speed', 9, '2,0,2,1,1,1,0,2,0', '1.70873786407767,1,0.2912621359223301'),
(26, '', '2014-04-19 22:30:59', 'Pokemon', 'Squirtle', '100', 'Charmander,Bulbasaur,Squirtle', 0, 'Speed,Defense,Attack', '0.3333333333333333,0.3333333333333333,0.3333333333333333', 'Charmander.Squirtle.Speed,Squirtle.Charmander.Attack,Bulbasaur.Charmander.Speed,Bulbasaur.Squirtle.Defense,Bulbasaur.Charmander.Defense,Squirtle.Bulbasaur.Attack,Charmander.Squirtle.Defense,Charmander.Bulbasaur.Attack,Bulbasaur.Squirtle.Speed', 9, '1.1,0.1,1.1,0.1,1.1,0.1,2.1,2.1,2.1', '0.7666666666666667,0.43333333333333335,2.0999999999999996'),
(27, '', '2014-04-19 22:53:47', 'Pokemon', 'Bulbasaur', '100', 'Charmander,Bulbasaur,Squirtle', 0, 'Speed,Defense,Attack', '0.3333333333333333,0.3333333333333333,0.3333333333333333', 'Bulbasaur.Squirtle.Attack,Squirtle.Bulbasaur.Defense,Squirtle.Bulbasaur.Speed,Charmander.Squirtle.Attack,Charmander.Squirtle.Speed,Squirtle.Charmander.Defense,Charmander.Bulbasaur.Defense,Charmander.Bulbasaur.Attack,Charmander.Bulbasaur.Speed', 9, '0.1,0.1,1.1,2.1,1.1,1.1,1.1,2.1,1.1', '0.43333333333333335,1.4333333333333333,1.4333333333333333'),
(28, '', '2014-04-19 23:16:03', 'Pokemon', 'Squirtle', '100', 'Charmander,Bulbasaur,Squirtle', 0, 'Speed,Defense,Attack', '0.3333333333333333,0.3333333333333333,0.3333333333333333', 'Charmander.Squirtle.Speed,Charmander.Squirtle.Defense,Squirtle.Bulbasaur.Attack,Bulbasaur.Squirtle.Defense,Bulbasaur.Charmander.Attack,Charmander.Bulbasaur.Speed,Squirtle.Bulbasaur.Speed,Charmander.Squirtle.Attack,Bulbasaur.Charmander.Defense', 9, '1.1,0.1,0.1,1.1,1.1,1.1,1.1,2.1,2.1', '0.43333333333333335,1.1,1.7666666666666666'),
(29, '', '2014-04-19 23:16:13', 'Pokemon', 'Bulbasaur', '0', 'Charmander,Bulbasaur,Squirtle', 0, 'Speed,Defense,Attack', '0.3333333333333333,0.3333333333333333,0.3333333333333333', '', 0, '0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1', '0.1,0.1,0.1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `google_id` varchar(50) NOT NULL,
  `first_name` varchar(35) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `username` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `first_name`, `last_name`, `email_address`, `username`) VALUES
(33, '110561554487846173425', 'Desmond', 'Kolean-Burley', '', ''),
(31, '101583240691601799956', 'Desmond', 'Kolean-Burley', '', ''),
(32, '104309792418093287829', 'Jenny', 'Pollack', '', ''),
(34, '100072277291957247394', 'Shiva', 'Kilaru', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
