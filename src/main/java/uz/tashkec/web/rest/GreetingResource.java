package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.GreetingRepository;
import uz.tashkec.service.GreetingService;
import uz.tashkec.service.dto.GreetingDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.Greeting}.
 */
@RestController
@RequestMapping("/api")
public class GreetingResource {

    private final Logger log = LoggerFactory.getLogger(GreetingResource.class);

    private static final String ENTITY_NAME = "greeting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GreetingService greetingService;

    private final GreetingRepository greetingRepository;

    public GreetingResource(GreetingService greetingService, GreetingRepository greetingRepository) {
        this.greetingService = greetingService;
        this.greetingRepository = greetingRepository;
    }

    /**
     * {@code POST  /greetings} : Create a new greeting.
     *
     * @param greetingDTO the greetingDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new greetingDTO, or with status {@code 400 (Bad Request)} if the greeting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/greetings")
    public ResponseEntity<GreetingDTO> createGreeting(@RequestBody GreetingDTO greetingDTO) throws URISyntaxException {
        log.debug("REST request to save Greeting : {}", greetingDTO);
        if (greetingDTO.getId() != null) {
            throw new BadRequestAlertException("A new greeting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GreetingDTO result = greetingService.save(greetingDTO);
        return ResponseEntity
            .created(new URI("/api/greetings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /greetings/:id} : Updates an existing greeting.
     *
     * @param id the id of the greetingDTO to save.
     * @param greetingDTO the greetingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated greetingDTO,
     * or with status {@code 400 (Bad Request)} if the greetingDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the greetingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/greetings/{id}")
    public ResponseEntity<GreetingDTO> updateGreeting(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GreetingDTO greetingDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Greeting : {}, {}", id, greetingDTO);
        if (greetingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, greetingDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!greetingRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GreetingDTO result = greetingService.update(greetingDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, greetingDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /greetings/:id} : Partial updates given fields of an existing greeting, field will ignore if it is null
     *
     * @param id the id of the greetingDTO to save.
     * @param greetingDTO the greetingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated greetingDTO,
     * or with status {@code 400 (Bad Request)} if the greetingDTO is not valid,
     * or with status {@code 404 (Not Found)} if the greetingDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the greetingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/greetings/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GreetingDTO> partialUpdateGreeting(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody GreetingDTO greetingDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Greeting partially : {}, {}", id, greetingDTO);
        if (greetingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, greetingDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!greetingRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GreetingDTO> result = greetingService.partialUpdate(greetingDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, greetingDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /greetings} : get all the greetings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of greetings in body.
     */
    @GetMapping("/greetings")
    public List<GreetingDTO> getAllGreetings() {
        log.debug("REST request to get all Greetings");
        return greetingService.findAll();
    }

    /**
     * {@code GET  /greetings/:id} : get the "id" greeting.
     *
     * @param id the id of the greetingDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the greetingDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/greetings/{id}")
    public ResponseEntity<GreetingDTO> getGreeting(@PathVariable Long id) {
        log.debug("REST request to get Greeting : {}", id);
        Optional<GreetingDTO> greetingDTO = greetingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(greetingDTO);
    }

    /**
     * {@code DELETE  /greetings/:id} : delete the "id" greeting.
     *
     * @param id the id of the greetingDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/greetings/{id}")
    public ResponseEntity<Void> deleteGreeting(@PathVariable Long id) {
        log.debug("REST request to delete Greeting : {}", id);
        greetingService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
