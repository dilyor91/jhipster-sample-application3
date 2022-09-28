package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.Greeting;

/**
 * Spring Data JPA repository for the Greeting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GreetingRepository extends JpaRepository<Greeting, Long> {}
