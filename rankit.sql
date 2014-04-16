-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: sql100.byethost8.com
-- Generation Time: Apr 16, 2014 at 02:15 PM
-- Server version: 5.6.16-64.1-56
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
  `name` varchar(75) NOT NULL,
  `winner` varchar(75) NOT NULL,
  `progress_percentage` varchar(10) NOT NULL,
  `options` varchar(500) NOT NULL,
  `factor_names` varchar(500) NOT NULL,
  `factor_weights` varchar(200) NOT NULL,
  `scores` varchar(200) NOT NULL,
  `final_scores` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `rankit`
--

INSERT INTO `rankit` (`id`, `user_id`, `date`, `name`, `winner`, `progress_percentage`, `options`, `factor_names`, `factor_weights`, `scores`, `final_scores`) VALUES
(4, '', '2014-04-16 13:06:32', '', 'Charmander', '0', 'Charmander,Bulbasaur,Squirtle', 'Speed,Defense,Attack', '0.3333333333333333,0.3333333333333333,0.3333333333333333', '500,500,500,500,500,500,500,500,500', '500,500,500'),
(5, '', '2014-04-16 13:46:36', '', 'steve', '17', 'steve,Charmander,Bulbasaur,Squirtle', 'Speed,Defense,Attack', '0.3333333333333333,0.3333333333333333,0.3333333333333333', '500,625,625,500,375,625,500,500,375,500,500,375', '583.3333333333333,499.99999999999994,458.3333333333333,458.3333333333333');

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
