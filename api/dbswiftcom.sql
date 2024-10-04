-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 12 sep. 2024 à 15:27
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `swiftcom`
--

-- --------------------------------------------------------

--
-- Structure de la table `codtyp`
--

CREATE TABLE `codtyp` (
  `codetr` varchar(3) COLLATE utf8_bin NOT NULL,
  `libelle` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `codtyp`
--

INSERT INTO `codtyp` (`codetr`, `libelle`) VALUES
('001', 'Virement ordinaire'),
('002', 'Opération retrait especes'),
('013', 'ordre de restitution'),
('015', 'Remboursement davance intrajournaliere'),
('023', 'Marchée secondaire valeurs detat'),
('024', 'opération du marché monétaire interbancaire'),
('161', 'opration open market'),
('162', 'facilité permanentes');

-- --------------------------------------------------------

--
-- Structure de la table `f20hist`
--

CREATE TABLE `f20hist` (
  `ID` int(11) NOT NULL,
  `F20` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `F20_new` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `parti0`
--

CREATE TABLE `parti0` (
  `ID` int(11) NOT NULL,
  `partlib` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `partcode` varchar(4) COLLATE utf8_bin DEFAULT NULL,
  `partbic` varchar(25) COLLATE utf8_bin DEFAULT NULL,
  `partcpt` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `swiftcontent`
--

CREATE TABLE `swiftcontent` (
  `ID` int(11) NOT NULL,
  `FIELDNAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `VAL` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `F20_FK` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `swifthead`
--

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (1, 'Transaction Type', 'Ordinary Transfer', 'F20-001');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (2, 'Montant', 'Ordinary Transfer', 'F20-001');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (3, 'Transaction Type', 'Ordinary Transfer', 'F20-002');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (4, 'Montant', 'Ordinary Transfer', 'F20-003');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (5, 'Transfert ordinaire', 'Ordinary Transfer', 'F20-004');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (6, 'Transfert ordinaire', 'Ordinary Transfer', 'F20-005');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (7, 'Montant', 'Ordinary Transfer', 'F20-006');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (8, 'Transfert ordinaire', 'Ordinary Transfer', 'F20-007');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (9, 'Virement ordinaire', 'Ordinary Transfer', 'F20-008');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (10, 'Ordre de restitution', 'Ordinary Transfer', 'F20-009');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (11, 'Opration open market', 'Ordinary Transfer', 'F20-010');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (12, 'Facilite permanentes', 'Ordinary Transfer', 'F20-011');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (13, 'Montant', 'Ordinary Transfer', 'F20-012');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (14, 'Montant', 'Ordinary Transfer', 'F20-013');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (15, 'Montant', 'Ordinary Transfer', 'F20-014');

INSERT INTO `swiftcontent` (`ID`, `FIELDNAME`, `VAL`, `F20_FK`) 
VALUES (16, 'Transaction Type', 'Ordinary Transfer', 'F20-006');


-- --------------------------------------------------------

--
-- Structure de la table `swifthead`
--

CREATE TABLE `swifthead` (
  `F20` varchar(255) COLLATE utf8_bin NOT NULL,
  `mttype` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SENDER` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `RECEIVER` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `BICsender` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `BICreciever` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TypeF103` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `prioriteF113` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `urefidF108` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ureftrF121` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `etat` int(11) DEFAULT '0',
  `FILENAME` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ogfile` blob,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `swifthead`
--

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-001', '999', 'BANQUE A', 'BANQUE B', 'message001.txt', '2024-09-18 10:35:12');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-002', '999', 'BANQUE C', 'BANQUE D', 'message002.txt', '2024-08-17 11:03:46');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-003', '900', 'Banque Nationale', 'Banque Internationale', 'acceptation_1.txt', '2024-09-19 09:53:59');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-004', '900', 'Banque Internationale', 'Banque Nationale', 'acceptation_2.txt', '2024-06-13 09:53:59');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-005', '910', 'Client X', 'Banque Nationale', 'acceptation_3.txt', '2024-09-19 09:53:59');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-006', '196', 'Client Y', 'Client Z', 'refus_1.txt', '2024-09-19 09:53:59');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-007', '296', 'Client X', 'Banque Nationale', 'refus_2.txt', '2024-09-18 10:35:12');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-008', '103', 'Client X', 'Client Y', 'MFinencierClients_1.txt', '2024-04-16 13:34:09');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-009', '202', 'Banque Nationale', 'Banque Internationale', 'MFinencierInstitue_1.txt', '2024-08-15 13:34:09');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-010', '202', 'Banque Internationale', 'Banque Nationale', 'MFinencierInstitue_2.txt', '2024-08-14 13:35:09');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-011', '202', 'Banque Internationale', 'Banque Nationale', 'MFinencierInstitue_3.txt', '2024-08-04 13:34:09');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-012', '940', 'Banque Nationale', 'Client X', 'ExtraitCompte_1.txt', '2024-09-19 14:09:08');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-013', '950', 'Banque Nationale', 'Client Y', 'ExtraitCompte_2.txt', '2024-08-15 14:09:07');

INSERT INTO `swifthead` (`F20`, `mttype`, `SENDER`, `RECEIVER`, `FILENAME`, `timestamp`) 
VALUES ('F20-014', '950', 'Banque Internationale', 'Client Z', 'ExtraitCompte_3.txt', '2024-09-19 14:09:07');


-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `code_user` varchar(30) COLLATE utf8_bin NOT NULL,
  `date_naissance` date DEFAULT NULL,
  `mot_pass` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(25) COLLATE utf8_bin DEFAULT NULL,
  `is_actif` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`code_user`, `date_naissance`, `mot_pass`, `email`, `is_actif`) VALUES
('admin', NULL, 'd033e22ae348aeb5660fc2140aec35850c4da997', NULL, NULL, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `f20hist`
--
ALTER TABLE `f20hist`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `F20` (`F20`);

--
-- Index pour la table `parti0`
--
ALTER TABLE `parti0`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `partlib` (`partlib`),
  ADD UNIQUE KEY `partcode` (`partcode`),
  ADD UNIQUE KEY `partbic` (`partbic`),
  ADD UNIQUE KEY `partcpt` (`partcpt`);

--
-- Index pour la table `swiftcontent`
--
ALTER TABLE `swiftcontent`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `F20_FK` (`F20_FK`);

--
-- Index pour la table `swifthead`
--
ALTER TABLE `swifthead`
  ADD PRIMARY KEY (`F20`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`code_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `f20hist`
--
ALTER TABLE `f20hist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `parti0`
--
ALTER TABLE `parti0`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `swiftcontent`
--
ALTER TABLE `swiftcontent`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `swiftcontent`
--
ALTER TABLE `swiftcontent`
  ADD CONSTRAINT `swiftcontent_ibfk_1` FOREIGN KEY (`F20_FK`) REFERENCES `swifthead` (`F20`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
