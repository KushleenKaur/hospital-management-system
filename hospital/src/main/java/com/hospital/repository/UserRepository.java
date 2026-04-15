package com.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}