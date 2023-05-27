--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: general_election; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.general_election (
    id uuid NOT NULL,
    username character varying(100) NOT NULL,
    constituency character varying(100) NOT NULL,
    party_and_candidate_name character varying(100) NOT NULL,
    user_type character varying(50) NOT NULL

);


ALTER TABLE public.general_election OWNER TO postgres;

--
-- Data for Name: general_election; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.general_election (id, username, constituency, party_and_candidate_name) FROM stdin;
\.


--
-- Name: general_election general_election_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.general_election
    ADD CONSTRAINT general_election_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

