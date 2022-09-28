package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.Logo;

/**
 * Spring Data JPA repository for the Logo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LogoRepository extends JpaRepository<Logo, Long> {}
