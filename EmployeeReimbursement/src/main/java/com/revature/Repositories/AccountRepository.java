package com.revature.Repositories;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Reimbursement, Integer> {
}
